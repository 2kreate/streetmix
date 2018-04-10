/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Admin } from '../Admin'
import { ERRORS } from '../errors'

describe('Admin', () => {
  it('renders', () => {
    const wrapper = shallow(<Admin errorType={ERRORS.NOT_FOUND} />)
    expect(wrapper.exists()).toEqual(true)
  })
})
