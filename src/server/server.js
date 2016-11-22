import express from 'express'
import path from 'path'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import http from 'http'
import socketio from 'socket.io'
import chat from './chat'
import mysql from 'mysql'
import sha512 from 'sha512'
import uuid from 'uuid'

export default function (config) {
  const app = express()

  const connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())
  app.use(express.static(path.resolve('./dist')))

  app.get('*', function(req, res){
    res.sendFile(path.resolve('./dist/index.html'))
  })

  app.post('/login', function(req, res){
    const username = req.body.username
    const password = sha512(req.body.password + config.salt).toString('hex')

    const sql = 'SELECT * FROM users WHERE username=? AND password=?'

    connection.query(sql, [username, password], function (err, results){
      if (err) {
        res.json({error:true, message:'Invalid Username or Password'})
      } else {
        const tokenSql = 'UPDATE tokens SET token=? WHERE user_id=?'
        const token = uuid()
        connection.query(tokenSql, [token, results.id], function(err, updateres){
          res.cookie('token', token)
          res.cookie('username', username)
          res.json({success:true})
        })
      }
    })
  })

  app.post('/register', function(req, res){
    const username = req.body.username
    const password = sha512(req.body.password + config.salt).toString('hex')

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)'

    connection.query(sql, [username, password], function(err, result){
      if (err) {
        res.json({error:true, message: 'Username already exists'})
      } else {
        const tokenSql = 'INSERT INTO tokens (token, user_id) VALUES (?, ?)'
        const token = uuid()
        connection.query(tokenSql, [token, result.inserId], function(err, tokenres){
          res.cookie('token', token)
          res.cookie('username', username)
          res.json({insertId:result.insertId})
        })
      }
    })
  })

  const server = http.Server(app)
  const io = socketio(server)

  chat(io)

  server.listen(config.port, config.hostname, function () {
    console.log(chalk.cyan('Server Listening on port: ') + config.port)
  })
}
