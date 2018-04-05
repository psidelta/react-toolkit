/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ColorTextInput from '../ColorTextInput';
import { mount } from 'enzyme';

describe('value', () => {
  describe('onChange', () => {
    it('is called only when a valid color is entered', () => {
      const onChange = jest.fn();
      const wrapper = mount(<ColorTextInput onChange={onChange} />);
      wrapper.instance().handleTextChange('hello');
      expect(onChange.mock.calls).toHaveLength(0);
      wrapper.instance().handleTextChange('#hello');
      expect(onChange.mock.calls).toHaveLength(0);
      wrapper.instance().handleTextChange('#fff');
      expect(onChange.mock.calls).toHaveLength(1);
    });
  });
});

describe('onTextChange', () => {
  it('is called when ever text is changed', () => {
    const onTextChange = jest.fn();
    const wrapper = mount(<ColorTextInput onTextChange={onTextChange} />);
    wrapper.instance().handleTextChange('#hello');
    expect(onTextChange.mock.calls).toHaveLength(1);
  });
});

describe('input props', () => {
  it('inputProps get applied on input', () => {
    const wrapper = mount(<ColorTextInput inputProps={{ id: 'input' }} />);
    expect(wrapper.find('#input')).toHaveLength(2);
  });
  it('inputStyle get applied on input', () => {
    const wrapper = mount(
      <ColorTextInput
        inputStyle={{ color: 'red' }}
        inputProps={{ id: 'input' }}
      />
    );
    expect(
      wrapper
        .find('#input')
        .at(0)
        .props().style.color
    ).toEqual('red');
  });
});

describe('colorPreview props', () => {
  it('colorPreviewProps gets applied on color preview', () => {
    const wrapper = mount(
      <ColorTextInput colorPreviewProps={{ id: 'input' }} />
    );
    expect(wrapper.find('#input')).toHaveLength(1);
  });
  it('colorPreviewStyle gets applied on color preview', () => {
    const wrapper = mount(
      <ColorTextInput
        colorPreviewProps={{ id: 'input' }}
        colorPreviewStyle={{ color: 'red' }}
      />
    );
    expect(
      wrapper
        .find('#input')
        .at(0)
        .props().style.color
    ).toEqual('red');
  });
  it('renderColorPreview overwrites color preview render', () => {
    const wrapper = mount(
      <ColorTextInput renderColorPreview={() => <div id="colorPreview" />} />
    );
    expect(wrapper.find('#colorPreview')).toHaveLength(1);
  });
  it('renderColorPreview overwrites color preview by mutating domProps', () => {
    const wrapper = mount(
      <ColorTextInput
        renderColorPreview={({ domProps }) => {
          domProps.id = 'colorPreview';
        }}
      />
    );
    expect(wrapper.find('#colorPreview')).toHaveLength(1);
  });
});
