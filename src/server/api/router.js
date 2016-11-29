import express from 'express'
import config from 'config'
import sha512 from 'sha512'
import mysql from 'mysql'
import uuid from 'uuid'

const connection = mysql.createConnection({
  host: config.get('db.host'),
  user: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.database')
})

const router = express.Router()

router.post('/token', function(req, res){
  const username = req.body.username
  const password = sha512(req.body.password + config.get('salt')).toString('hex')

  const sql = 'SELECT * FROM users WHERE username=? AND password=?'

  connection.query(sql, [username, password], function (err, results){
    if (err) {
      res.status(500).send('Oops!')
    } else {
      if (results.length > 0) {
        const tokenSql = 'UPDATE tokens SET token=? WHERE user_id=?'
        const token = uuid()
        connection.query(tokenSql, [token, results.id], function(err, updateres){
          res.json({token: token})
        })
      } else {
        res.status(401).send('Invalid username or password')
      }
    }
  })
})

router.post('/register', function(req,res){
  const username = req.body.username
  const password = sha512(req.body.password + config.salt).toString('hex')

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)'

  connection.query(sql, [username, password], function(err, result){
    if (err) {
      res.json({error:true, message: 'Username already exists'})
    } else {
      res.json({success:true, message: 'Username has been registered'})
    }
  })
})

export default router
