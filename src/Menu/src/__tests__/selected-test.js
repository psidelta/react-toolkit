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
import { mount }  from 'enzyme'
import Menu from '../Menu'

describe('selected', () => {
  describe('renderCheckInput', () => {
    const items = [
      { name: 'name1', label: 'test1' },
      { name: 'name2', label: 'test3' },
      { name: 'name2', value: 'name3', label: 'test2' },
    ]

    it('renders a custom input', () => {
      const renderCheckInput = sinon
        .stub()
        .returns(<div className="customCheckInput" />)
      const wrapper = mount(
        <Menu
          items={items}
          renderCheckInput={renderCheckInput}
          enableSelection
        />
      )
      expect(renderCheckInput.called).to.be.true
      expect(wrapper.find('.customCheckInput')).to.have.length(1)
    })
    it('renders an input with mutated props', () => {
      const wrapper = mount(
        <Menu
          items={items}
          enableSelection
          renderCheckInput={({ domProps }) => {
            domProps.id = 'customCheckInput'
          }}
        />
      )
      expect(wrapper.find('#customCheckInput')).to.have.length(1)
    })
  })
  describe('renderRadioInput', () => {
    const items = [
      { name: 'name1', label: 'test1' },
      { name: 'name2', label: 'test3' },
      { name: 'name2', value: 'name3', label: 'test2' },
    ]

    it('renders a custom input', () => {
      const renderRadioInput = sinon
        .stub()
        .returns(<div className="customRadioInput" />)
      const wrapper = mount(
        <Menu
          items={items}
          renderRadioInput={renderRadioInput}
          enableSelection
        />
      )
      expect(renderRadioInput.called).to.be.true
      expect(wrapper.find('.customRadioInput')).to.have.length(2)
    })
    it('renders with mutated props', () => {
      const wrapper = mount(
        <Menu
          items={items}
          renderRadioInput={({ domProps }) => {
            domProps.className = 'customRadioInput'
          }}
          enableSelection
        />
      )
      expect(wrapper.find('.customRadioInput')).to.have.length(2)
    })
  })
})
