/* eslint-disable no-unused-vars */
import React from 'react'

import { withTheme } from 'styled-components'
import { translate } from 'react-i18next'
import { i18nHelper, wrapper } from '../i18n'
import { redirect } from '../helpers'
import Router from 'next/router'
const translateNS = ['common']

Router.onRouteChangeComplete = () => {
  window.scroll(0, 0)
}

const Layout = class Layout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      onTop: true,
      incidentAlert: false
    }
  }

  startIncident = () => {
    this.setState({incidentAlert: false})
    redirect('report-incident', {step: 1})
  }

  handleCancel = () => {
    this.setState({incidentAlert: false})
  }

  componentDidMount () {
    if (this.state.onTop === true && window.scrollY > 0) { // check for page refresh
      this.setState({onTop: false})
    }
    window.addEventListener('scroll', (e) => {
      if (window.scrollY > 0 && this.state.onTop === true) {
        this.setState({onTop: false})
      } else if (window.scrollY === 0 && this.state.onTop === false) {
        this.setState({onTop: true})
      }
    })
  }

  getLoginLabel () {
    return this.props.session.user
      ? this.props.session.user.first_name + ' ' + this.props.session.user.last_name
      : 'Login'
  }

  render () {
    const path = this.props.path

    const navbarItems = [
      {
        label: this.props.t('menu.home'),
        type: 'link',
        link: 'dashboard',
        status: path === '/dashboard'
      }
    ]

    return (
      <div>
        { /* <Navbar items={this.props.hideNav ? [] : navbarItems} /> */ }
        { this.props.t('menu.lang_jobs') }
        {this.props.children}
      </div>
    )
  }
}

Layout.translateNS = translateNS
export default translate(translateNS)(Layout)
