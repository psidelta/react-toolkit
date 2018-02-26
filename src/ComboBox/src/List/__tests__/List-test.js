/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import { shallow, mount } from 'enzyme'

import List from '../List'

describe('List', () => {
  it('adds empty text', () => {
    const wrapper = shallow(<List
      data={[]}
      emptyText={<div id="emptyText" />}
    />)

    expect(wrapper.find('#emptyText'))
      .to.have.length(1)
  })
  it('adds loading text', () => {
    const wrapper = shallow(<List
      loading
      data={[]}
      loadingText={<div id="loadingtext" />}
    />)

    expect(wrapper.find('#loadingtext'))
      .to.have.length(1)
  })

  it('renders what renderHeader returns', () => {
    const wrapper = shallow(<List
      data={[]}
      emptyText={<div id="emptyText" />}
      renderHeader={() => <div id="customHeader" />}
    />)
    expect(wrapper.find('#customHeader')).to.have.length(1)
  })

  it('renders what renderFooter returns', () => {
    const wrapper = shallow(<List
      data={[]}
      emptyText={<div id="emptyText" />}
      renderFooter={() => <div id="customFooter" />}
    />)
    expect(wrapper.find('#customFooter')).to.have.length(1)
  })
})
