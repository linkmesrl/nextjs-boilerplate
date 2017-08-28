import I18nHelper from 'next-i18n-helper'
import getTranslation from './getTranslations'
import { translate, I18nextProvider } from 'react-i18next'
import React from 'react'
import theme from '../assets/theme.json'
import Layout from './layout'
import { ThemeProvider } from 'styled-components'
import {redirect} from './helpers'
import { getMeta, seoRoute } from '../seo'

const translateNS = ['common']

const getWrapper = (i18nHelper) => (Page, isHome) => class Wrapper extends React.Component {
  constructor (props) {
    super(props)
    const { translations, pageInitialProps = {} } = props
    this.i18n = i18nHelper.getI18n(translations)
    this.pageInitialProps = {
      ...props,
      ...pageInitialProps
    }
    this.isHome = isHome
    delete this.pageInitialProps.pageInitialProps
    delete this.pageInitialProps.translations
  }

  onLangChange = (lang) => {
    const params = {lang}

    if (this.pageInitialProps.altLangId) {
      params.id = this.pageInitialProps.altLangId
    }

    console.log(this.props.url.pathname)
    redirect(this.props.url.pathname.slice(1) || 'home', params)
  }

  static async getInitialProps (ctx) {
    var pageInitialProps = {}
    Page.getInitialProps && (pageInitialProps = await Page.getInitialProps(ctx))

    if (!ctx.req) return { pageInitialProps }

    // translation
    var translateNS = [...Page.translateNS || []].filter(function (item, pos, self) {
      return self.indexOf(item) === pos
    })

    var translations = await getTranslation(i18nHelper.localesBaseUrl)(
      i18nHelper.getCurrentLanguage(ctx.req),
      translateNS,
      ctx.req
    )

    return {
      translations,
      pageInitialProps
    }
  }

  render () {
    this.pageInitialProps = Object.assign(this.pageInitialProps, this.props.pageInitialProps)
    return <I18nextProvider i18n={this.i18n}>
      <ThemeProvider theme={theme}>
        <Layout
          meta={getMeta(seoRoute(this.pageInitialProps.url.pathname, this.pageInitialProps.seoRouteParams || []))}
          session={this.pageInitialProps.session}
          path={this.pageInitialProps.url.pathname}
          hideNav={this.pageInitialProps.hideNav}
          showFooterNav={this.pageInitialProps.showFooterNav}
          hideFooter={this.pageInitialProps.hideFooter}
          onLangChange={this.onLangChange}
        >
          <Page {...this.pageInitialProps} />
        </Layout>
      </ThemeProvider>
    </I18nextProvider>
  }
}

export const i18nHelper = new I18nHelper({
  defaultLang: 'en',
  supportLangs: ['en'],
  localesBaseUrl: '/locales',
  i18nOption: {
    cache: {
      enabled: false
    }
  }
})

export const wrapper = getWrapper(i18nHelper)
export const wrapPage = (page, isHome) => {
  page.translateNS = [...translateNS]
  return wrapper(translate(translateNS)(page), isHome)
}

export const wrapComponent = (page) => {
  page.translateNS = [...translateNS]
  return translate(translateNS)(page)
}
