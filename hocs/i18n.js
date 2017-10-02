import React from 'react'
import i18n from '../services/i18n'
import init from '../server/i18n'
import path from 'path'

export const withTranslationProps = (Child) => {
  return class extends React.Component {
    static async getInitialProps (context) {
      const childProps = await Child.getInitialProps(context)

      if (context.req && !process.browser) {
        if (!context.req.i18n) {
          context.req.i18n = await init('/home/zio/code/riot/nextjs-boilerplate/locales').init()
          i18n.changeLanguage('en')
          context.req.i18n.loadLanguages('en', () => console.log('ASASASASAS', context.req.i18n.languages))
        }
        // console.log(context.req.i18n)
        return Object.assign(childProps, i18n.getInitialProps(context.req, ['common']))
      } else {
        return childProps
      }
    }

    render () {
      return <Child {...this.props}/>
    }
  }
}
