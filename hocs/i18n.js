import React from 'react'
import i18n from '../services/i18n'

export const withTranslationProps = (Child) => {
  return class extends React.Component {
    static async getInitialProps (context) {
      const childProps = await Child.getInitialProps(context)

      if (context.req && !process.browser) {
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
