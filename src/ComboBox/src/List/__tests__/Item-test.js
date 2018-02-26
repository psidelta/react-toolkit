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
import { mount } from 'enzyme'
import Item from '../Item'

describe('Item', () => {
  it('calls onclick with id', () => {
    const onClick = sinon.spy()
    const wrapper = mount(<Item className="item" id={20} onClick={onClick} />)
    wrapper.find('.item').at(0).simulate('click')
    expect(onClick.called).to.be.true
    expect(onClick.args[0][0]).to.equal(20)
  })

  describe('selectedClassName and selectedStyle', () => {
    it('adds className and style only on selected items', () => {
      const wrapper = mount(<Item
        selected
        selectedClassName="selected"
        rootClassName="root"
        selectedStyle={{ color: 'red' }}
      />)
      expect(wrapper.find('.root--selected')).to.have.length(1)
      expect(wrapper.find('.root--selected').at(0).props().style.color).to.equal('red')
    })
  })

  describe('className', () => {
    it('adds correct state classnames and style', () => {
      const wrapper = mount(<Item active rootClassName="root" />)
      expect(wrapper.find('.root--active')).to.have.length(1)
    })
  })

  describe('disabled', () => {
    it('adds correct className', () => {
      const wrapper = mount(<Item item={{ disabled: true }} rootClassName="root" />)
      expect(wrapper.find('.root--disabled')).to.have.length(1)
    })

    it('does\'t call onClick', () => {
      const onClick = sinon.spy()
      const wrapper = mount(<Item item={{ disabled: true }} onClick={onClick} />)
      wrapper.simulate('click')
      expect(onClick.called).to.be.false
    })
  })
})
