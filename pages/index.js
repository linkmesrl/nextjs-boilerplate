// s-check

import React from 'react'
import { translate } from 'react-i18next'
import i18n from '../services/i18n'
import {withTranslationProps} from '../hocs/i18n'
import flow from 'lodash.flow'

import styled from 'styled-components'

const Title = styled.h1`
  color: red;
  font-size: 50px
`

class Main extends React.Component {
  static async getInitialProps () {
    return {prop: 'prop'}
  }

  render () {
    const toggle = lng => () => i18n.changeLanguage(lng)
    return (
      <div>
        <Title>{this.props.t('menu.jobs')}</Title>
        <p onClick={toggle('en')}>SWITCH EN{this.props.prop}</p>
        <p onClick={toggle('it')}>SWITCH IT{this.props.prop}</p>
      </div>
    )
  }
}

export default flow(
  translate(['common'], { i18n, wait: process['browser'] }),
  withTranslationProps
)(Main)
