import superagent from 'superagent'

module.exports.isoGet = async function (req, path, params) {
  const port = req ? ':' + process.env.PORT : ''
  const users = superagent.get(port + path)
  if (req) {
    if (req.headers.cookie) {
      users.set('cookie', req.headers.cookie)
    }
    if (req.headers.authorization) {
      users.set('authorization', req.headers.authorization)
    }
  }

  const raw = (await users).text
  const result = typeof raw === 'string'
    ? JSON.parse(raw)
    : raw
  return result
}
