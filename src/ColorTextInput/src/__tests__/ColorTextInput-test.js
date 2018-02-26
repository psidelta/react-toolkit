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
import ColorTextInput from '../ColorTextInput'
import { shallow } from 'enzyme'

describe('value', () => {
  describe('onChange', () => {
    it('is called only when a valid color is entered', () => {
      const onChange = sinon.spy()
      const wrapper = shallow(<ColorTextInput onChange={onChange} />)
      wrapper.instance().handleTextChange('hello')
      expect(onChange.called).to.be.false
      wrapper.instance().handleTextChange('#hello')
      expect(onChange.called).to.be.false
      wrapper.instance().handleTextChange('#fff')
      expect(onChange.called).to.be.true
    })
  })
})

describe('onTextChange', () => {
  it('is called when ever text is changed', () => {
    const onTextChange = sinon.spy()
    const wrapper = shallow(<ColorTextInput onTextChange={onTextChange} />)
    wrapper.instance().handleTextChange('#hello')
    expect(onTextChange.called).to.be.true
  })
})

describe('input props', () => {
  it('inputProps get applied on input', () => {
    const wrapper = shallow(<ColorTextInput inputProps={{ id: 'input' }} />)
    expect(wrapper.find('#input')).to.have.length(1)
  })
  it('inputStyle get applied on input', () => {
    const wrapper = shallow(<ColorTextInput
      inputStyle={{ color: 'red' }}
      inputProps={{ id: 'input' }}
    />)
    expect(wrapper.find('#input').at(0).props().style.color).to.equal('red')
  })
})

describe('colorPreview props', () => {
  it('colorPreviewProps gets applied on color preview', () => {
    const wrapper = shallow(<ColorTextInput
      colorPreviewProps={{ id: 'input' }}
    />)
    expect(wrapper.find('#input')).to.have.length(1)
  })
  it('colorPreviewStyle gets applied on color preview', () => {
    const wrapper = shallow(<ColorTextInput
      colorPreviewProps={{ id: 'input' }}
      colorPreviewStyle={{ color: 'red' }}
    />)
    expect(wrapper.find('#input').at(0).props().style.color).to.equal('red')
  })
  it('renderColorPreview overwrites color preview render', () => {
    const wrapper = shallow(<ColorTextInput
      renderColorPreview={() => <div id="colorPreview" />}
    />)
    expect(wrapper.find('#colorPreview')).to.have.length(1)
  })
  it('renderColorPreview overwrites color preview by mutating domProps', () => {
    const wrapper = shallow(<ColorTextInput
      renderColorPreview={({ domProps }) => {
        domProps.id = "colorPreview"
      }}
    />)
    expect(wrapper.find('#colorPreview')).to.have.length(1)

  })
})
