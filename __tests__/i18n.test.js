/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import App from '../pages/index.js'

describe('the i18n component', () => {
  it('App shows "Hello world!"', () => {
    const app = shallow(<App />)

    expect(app.find('p').text()).toEqual('Hello World!')
  })
})
