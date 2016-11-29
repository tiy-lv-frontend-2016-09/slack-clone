import express from 'express'
import path from 'path'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import http from 'http'
import socketio from 'socket.io'
import chat from './chat'
import apiRouter from './api/router'

export default function (config) {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())
  app.use(express.static(path.resolve('./dist')))

  app.use('/api', apiRouter)

  app.get('*', function(req, res){
    res.sendFile(path.resolve('./dist/index.html'))
  })

  const server = http.Server(app)
  const io = socketio(server)

  chat(io)

  server.listen(config.port, config.hostname, function () {
    console.log(chalk.cyan('Server Listening on port: ') + config.port)
  })
}
