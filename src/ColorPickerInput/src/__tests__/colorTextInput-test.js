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
import ColorPickerInput from '../ColorPickerInput'
import ColorTextInput from '../../../ColorTextInput'
import { mount } from 'enzyme'


describe('ColorTextInput', () => {
  it('adds colorTextInputProps on ColorTextInput',  () => {
    const wrapper = mount(<ColorPickerInput
      colorTextInputProps={{ id: 'colorTextInput' }}
    />)
    expect(wrapper.find(ColorTextInput).at(0).props().id)
      .to.equal('colorTextInput')
  })
  it('adds onTextChange, text, defaultText to ColorTextInput', () => {
    const props = {
      onTextChange: () => {},
      text: 'text',
      defaultText: 'defaultText',
    }
    const wrapper = mount(<ColorPickerInput
      {...props}
    />)

    expect(wrapper.find(ColorTextInput).at(0).props().onTextChange)
      .to.equal(props.onTextChange)

    expect(wrapper.find(ColorTextInput).at(0).props().text)
      .to.equal('text')

    expect(wrapper.find(ColorTextInput).at(0).props().defaultText)
      .to.equal('defaultText')
  })
  it('renderColorTextInput overwrites ComponentTextProps by mutating the props', () => {
    const wrapper = mount(<ColorPickerInput
      renderColorTextInput={({ colorTextInputProps }) => {
        colorTextInputProps.id = "customId"
      }}
    />)
    expect(wrapper.find(ColorTextInput).at(0).props().id)
      .to.equal('customId')
  })
  it('renderColorTextInput overwrites the ColorTextInput by returning JSX', () => {
    const wrapper = mount(<ColorPickerInput
      renderColorTextInput={({ colorTextInputProps }) => {
        return <div id="customColorTextInput" />
      }}
    />)
    expect(wrapper.find(ColorTextInput)).to.have.length(0)
    expect(wrapper.find('#customColorTextInput')).to.have.length(1)
  })
})
