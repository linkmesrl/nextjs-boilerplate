import {isoGet} from './helpers'
export default (baseUrl) => {
  return async function getTranslation (lang, files, req) {
    if (!Array.isArray(files)) files = [files]

    var langData = {}
    await Promise.all(files.map(async (file) => {
      var json = await getNS(lang, file, req)
      langData[file] = json
      return true
    }))

    return {
      [lang]: langData
    }
  }

  async function getNS (lang, ns, req) {
    const result = await isoGet(req, `${baseUrl}/${lang}/${ns}.json`)
    return result
  }
}
