import express from 'express'
import path from 'path'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

export default function (config) {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())
  app.use(express.static(path.resolve('./dist')))

  app.get('*', function (req, res) {
    res.sendFile(path.resolve('./dist/index.html'))
  })

  app.listen(config.port, config.hostname, function () {
    console.log(chalk.cyan('Server Listening on port: ') + config.port)
  })
}
