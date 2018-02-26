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
import Combo from '../ComboBox'
import TextInput from '../TextInput'

const ROOT_CLASS = Combo.defaultProps.rootClassName

describe('Combo style', () => {
  it('adds emptyStyle when combo has value null', () => {
    const wrapper = mount(<Combo value={null} emptyStyle={{ color: 'empty' }} />)
    expect(wrapper.find(`.${ROOT_CLASS}`).at(0).props().style.color)
      .to.equal('empty')
  })
  it('adds emptyClassName when value is empty', () => {
    const wrapper = mount(<Combo value={null} emptyClassName="hello" />)
    expect(wrapper.find('.hello')).to.have.length(1)
  })
  it('adds disabledStyle when it is disabled', () => {
    const wrapper = mount(<Combo disabled disabledStyle={{ color: 'disabled' }} />)
    expect(wrapper.find(`.${ROOT_CLASS}`).at(0).props().style.color)
      .to.equal('disabled')
  })
  it('adds disabledClassName when disabled', () => {
    const wrapper = mount(<Combo disabled disabledClassName="disabled" />)
    expect(wrapper.find('.disabled')).to.have.length(1)
  })
  it('adds focusedStyle when focused', () => {
    const wrapper = mount(<Combo focusedStyle={{ color: 'focused' }} />)
    wrapper.setState({ focus: true })
    expect(wrapper.find(`.${ROOT_CLASS}`).at(0).props().style.color)
      .to.equal('focused')
  })
  it('adds focusedClassName when it is focused', () => {
    const wrapper = mount(<Combo focusedClassName="focused" />)
    wrapper.setState({ focus: true })
    expect(wrapper.find('.focused')).to.have.length(1)
  })

  describe('inputClassName', () => {
    it('gets applied on the input component', () => {
      const wrapper = mount(<Combo
        searchable
        text="hello world"
        inputClassName="customClassName"
      />)
      expect(wrapper.find('.customClassName')).to.have.length(1)
    })
  })

  describe('inputStyle', () => {
    it('getts applied on text input component', () => {
      const wrapper = mount(<Combo
        searchable
        text="hello world"
        inputStyle={{ color: 'red' }}
      />)
      expect(wrapper.find(TextInput).at(0).props().style.color).to.equal('red')
    })
  })
})
