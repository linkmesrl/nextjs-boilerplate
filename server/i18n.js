
// const express = require('express')
const path = require('path')
// const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const i18n = require('../services/i18n')

module.exports = (localeDir) => ({
  init: () => new Promise((resolve, reject) =>
    i18n
      .use(Backend)
      // .use(i18nextMiddleware.LanguageDetector)
      .init({
        preload: ['en', 'it'], // preload all langages
        lng: 'en',
        ns: ['common', 'otherstuff'], // need to preload all the namespaces
        backend: {
          loadPath: path.join(localeDir, '/{{lng}}/{{ns}}.json'),
          addPath: path.join(localeDir, '/{{lng}}/{{ns}}.missing.json')
        }
      }, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(i18n)
        }
      })
  )

  // addMiddlewares: (server, i18n) => {
  // serve locales for client
  // server.use(i18nextMiddleware.handle(i18n))
  //  server.use('/locales', express.static(localeDir))
  // server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n, null))
  // }
})
