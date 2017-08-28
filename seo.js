import { get, filter } from 'lodash'

import { i18nHelper } from './components/i18n'

const pagesMeta = {
  '/': {
    title: 'Homepage Riot',
    description: 'Presenting new classes'
  },
  'privacy': {
    title: 'Privacy',
    description: 'Privacy information'
  },
  'it': {
    '/': {
      title: 'Homepage Riot',
      description: 'Presentazione nuovi eroi'
    },
    'privacy': {
      title: 'Privacy',
      description: 'Informazioni sulla Privacy'
    }
  }
}

const getPaths = route => filter(route.split('/'), r => r)

module.exports.getMeta = route => {
  return get(pagesMeta, getPaths(route), {})
}

module.exports.seoRoute = (route, params) => {
  return i18nHelper.getCurrentLanguage() === 'de'
    ? `${route}${params.map(p => '/' + p)}`
    : `/${i18nHelper.getCurrentLanguage()}${route}${params.map(p => '/' + p)}`
}
