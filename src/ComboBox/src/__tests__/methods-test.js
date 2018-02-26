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
import { shallow } from 'enzyme'
import Combo from '../ComboBox'

describe('methods', () => {
  it('addItem appends at the end of the dataSource an item', () => {
    const wrapper = shallow(<Combo dataSource={[{ id: 1 }]} />)
    wrapper.instance().addItem({ id: 2 })
    expect(wrapper.instance().getData())
      .to.deep.equal([
        { id: 1 },
        { id: 2 },
      ])
  })
  it('clear - clears value and text', () => {
    const wrapper = shallow(<Combo defaultText="hello" defaultValue={3} />)
    const instance = wrapper.instance()
    instance.clear()
    expect(instance.getText()).to.be.null
    expect(instance.getValue()).to.be.null
  })

  describe('getItem', () => {
    it('returns the correct item', () => {
      const data = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]
      const wrapper = shallow(<Combo dataSource={data} idProperty="id" />)
      expect(wrapper.instance().getItem(2)).to.equal(data[1])
    })
  })
  describe('getItemCount', () => {
    it('returns the correct item', () => {
      const data = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]
      const wrapper = shallow(<Combo dataSource={data} idProperty="id" />)
      expect(wrapper.instance().getItemCount()).to.equal(3)
    })
  })
  describe('insertItem', () => {
    it('inserts an item at given index', () => {
      const data = [
        { id: 1 },
        { id: 3 },
      ]
      const wrapper = shallow(<Combo dataSource={data} idProperty="id" />)
      wrapper.instance().insertItem({ index: 1, item: { id: 2 } })
      expect(wrapper.instance().getData()[1]).to.deep.equal({ id: 2 })
    })
  })
  describe('removeItems', () => {
    it('removes items with given ids', () => {
      const data = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]
      const wrapper = shallow(<Combo dataSource={data} idProperty="id" />)
      wrapper.instance().removeItems([1, 3])
      expect(wrapper.instance().getData()).to.deep.equal([{ id: 2 }])
    })
  })
  describe('toggle', () => {
    it('toggles visibility', () => {
      const data = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]
      const wrapper = shallow(<Combo defaultExpanded dataSource={data} idProperty="id" />)
      const instance = wrapper.instance()
      expect(instance.getExpanded()).to.be.true
      expect(instance.toggle).to.be.ok
      instance.toggle()
      expect(instance.getExpanded()).to.be.false
      instance.toggle()
      expect(instance.getExpanded()).to.be.true
    })
  })
})
