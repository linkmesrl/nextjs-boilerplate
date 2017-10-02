// @ts-check

const express = require('express')
const next = require('next')

/** @type {any} */
const path = require('path')
const pinoMW = require('express-pino-logger')()
const pino = require('pino')()
const I18n = require('./server/i18n.js')(path.join(__dirname, 'locales'))

const nextRoutes = require('./server/nextRoutes')

// Handle fatal errors by logging and letting the app crash
process.on('uncaughtException', (err) => {
  pino.error('Uncaught Exception: ' + err)
  process.exit(1)
})

process.on('unhandledRejection', (reason, p) => {
  pino.error('Unhandled Rejection: Promise:', p, 'Reason:', reason)
  process.exit(1)
})

// Basic http conf
const nodeEnv = process.env.NODE_ENV || 'production'
const port = parseInt(process.env.PORT, 10) || 80
const host = process.env.HOST || '0.0.0.0'

// Enable dev mode when NODE_ENV == 'development'
const app = next({
  dir: '.',
  dev: (nodeEnv === 'development')
})

const server = express()
const serverPromise = new Promise((resolve, reject) => {
  Promise.all([I18n.init(), app.prepare()]).then((res) => {
    // server.use(pinoMW)
    server.use(express.static('assets'))
    server.set('x-powered-by', false)

    I18n.addMiddlewares(server, res[0])
    
    nextRoutes(server, app)

    server.listen(port, host, err => {
      if (err) {
        throw err
      }
      console.log(`> Ready on http://${host}:${port} --- [${nodeEnv}]`)
      resolve(server)
    })
  }).catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
    reject(err)
  })
})

module.exports = serverPromise


