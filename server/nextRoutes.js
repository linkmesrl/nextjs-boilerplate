const routes = require('next-routes')()

/**
 * Next.js route tweaks.
 * Redirects all routes to their slash terminated version
 */
module.exports = (server, app) => {
  server.use(routes.getRequestHandler(app, ({req, res, route, query}) => {

    if (process.env.NODE_ENV === 'development' && req.url.includes('webpack-hmr')) {
      return app.render(req, res, route.page, query)
    }
    return req.url.charAt(req.url.length - 1) !== '/' && req.url.length > 1
      ? res.redirect(301, req.url + '/')
      : app.render(req, res, route.page, query)
  }))
}
