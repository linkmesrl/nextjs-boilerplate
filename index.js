'use strict'

const express = require('express')
const next = require('next')
const lusca = require('lusca')
const routes = require('next-routes')()
const path = require('path')

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception: ' + err);
})
  
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection: Promise:', p, 'Reason:', reason)
})

// Default when run with `npm start` is 'production' and default port is '80'
// `npm run dev` defaults mode to 'development' & port to '3000'
const nodeEnv = process.env.NODE_ENV || 'production'
const port = process.env.PORT || 80
const host = process.env.HOST || '0.0.0.0'

const app = next({
  dir: '.',
  dev: (nodeEnv === 'development')
})

const nextRoutesHandler = routes.getRequestHandler(app, ({req, res, route, query}) => {
  req.cookies.lang = query.lang || 'en'
  res.cookie('lang', req.cookies.lang)

  if (nodeEnv === 'development' && req.url.includes('webpack-hmr')) {
    return app.render(req, res, route.page, query)
  }

  return req.url.charAt(req.url.length - 1) !== '/' && req.url.length > 1
    ? res.redirect(301, req.url + '/')
    : app.render(req, res, route.page, query)
})


const server = express()
const serverPromise = new Promise((resolve, reject) => {
  app.prepare().then(() => {
    server.use(express.static('assets'))
    server.use(lusca.xframe('SAMEORIGIN'))
    server.use(lusca.xssProtection(true))
    server.use(lusca.nosniff())
    server.set('x-powered-by', false)
    server.use('/locales', express.static(path.join(__dirname, '/locales')))
    
    server.use(nextRoutesHandler)

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


