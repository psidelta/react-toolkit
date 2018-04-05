/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ColorPickerInput from '../ColorPickerInput';
import ColorTextInput from '../../../ColorTextInput';
import { mount } from 'enzyme';

describe('ColorTextInput', () => {
  it('adds colorTextInputProps on ColorTextInput', () => {
    const wrapper = mount(
      <ColorPickerInput colorTextInputProps={{ id: 'colorTextInput' }} />
    );
    expect(
      wrapper
        .find(ColorTextInput)
        .at(0)
        .props().id
    ).toEqual('colorTextInput');
  });
  it('adds onTextChange, text, defaultText to ColorTextInput', () => {
    const props = {
      onTextChange: () => {},
      text: 'text',
      defaultText: 'defaultText'
    };
    const wrapper = mount(<ColorPickerInput {...props} />);

    expect(
      wrapper
        .find(ColorTextInput)
        .at(0)
        .props().onTextChange
    ).toEqual(props.onTextChange);

    expect(
      wrapper
        .find(ColorTextInput)
        .at(0)
        .props().text
    ).toEqual('text');

    expect(
      wrapper
        .find(ColorTextInput)
        .at(0)
        .props().defaultText
    ).toEqual('defaultText');
  });
  it('renderColorTextInput overwrites ComponentTextProps by mutating the props', () => {
    const wrapper = mount(
      <ColorPickerInput
        renderColorTextInput={({ colorTextInputProps }) => {
          colorTextInputProps.id = 'customId';
        }}
      />
    );
    expect(
      wrapper
        .find(ColorTextInput)
        .at(0)
        .props().id
    ).toEqual('customId');
  });
  it('renderColorTextInput overwrites the ColorTextInput by returning JSX', () => {
    const wrapper = mount(
      <ColorPickerInput
        renderColorTextInput={({ colorTextInputProps }) => {
          return <div id="customColorTextInput" />;
        }}
      />
    );
    expect(wrapper.find(ColorTextInput)).toHaveLength(0);
    expect(wrapper.find('#customColorTextInput')).toHaveLength(1);
  });
});
