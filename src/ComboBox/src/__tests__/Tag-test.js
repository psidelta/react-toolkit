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
import Tag from '../Tag'
import { mount } from 'enzyme'

describe('tag', () => {
  describe('border', () => {
    it('adds border on style', () => {
      const wrapper = mount(<Tag border='1px solid red' />)
      expect(wrapper.find('div').at(0).props().style.border )
        .to.equal('1px solid red')
    })
  })
  describe('padding', () => {
    it('adds padding on style', () => {
      const wrapper = mount(<Tag padding={20} />)
      expect(wrapper.find('div').at(0).props().style.padding )
        .to.equal(20)
    })
  })
  describe('width', () => {
    it('adds width on style', () => {
      const wrapper = mount(<Tag width={20} />)
      expect(wrapper.find('div').at(0).props().style.width )
        .to.equal(20)
    })
  })
  describe('height', () => {
    it('adds height on style', () => {
      const wrapper = mount(<Tag height={20} />)
      expect(wrapper.find('div').at(0).props().style.height )
        .to.equal(20)
    })
  })
  describe('style', () => {
    it('gets added on tag', () => {
      const wrapper = mount(<Tag style={{ color: 'red' }} />)
      expect(wrapper.find('div').at(0).props().style.color )
        .to.equal('red')
    })
  })
})
