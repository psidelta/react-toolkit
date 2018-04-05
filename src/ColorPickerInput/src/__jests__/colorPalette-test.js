/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ColorPickerInput from '../ColorPickerInput';
import ColorPalette from '../../../ColorPalette';
import { mount } from 'enzyme';

describe('ColorPalette Props', () => {
  it('adds colorPaletteProps to ColorPalette', () => {
    const wrapper = mount(
      <ColorPickerInput expanded colorPaletteProps={{ id: 'colorPaletteId' }} />
    );
    expect(
      wrapper
        .find(ColorPalette)
        .at(0)
        .props().id
    ).toEqual('colorPaletteId');
  });
  it('passes colorPalette as palette to ColorPalette', () => {
    const wrapper = mount(<ColorPickerInput expanded colorPalette="gray" />);
    expect(
      wrapper
        .find(ColorPalette)
        .at(0)
        .props().palette
    ).toEqual('gray');
  });
  it('renderColorPalette overwrites ColorPalette by returning jsx', () => {
    const wrapper = mount(
      <ColorPickerInput
        expanded
        renderColorPalette={() => {
          return <div id="customColorPalette" />;
        }}
      />
    );
    expect(wrapper.find('#customColorPalette')).toHaveLength(1);
    expect(wrapper.find(ColorPalette)).toHaveLength(1);
  });
  it('renderColorPalette overwrites ColorPalette by mutating paletteProps', () => {
    const wrapper = mount(
      <ColorPickerInput
        expanded
        renderColorPalette={config => {
          config.paletteProps.id = 'customColorPalette';
        }}
      />
    );
    expect(wrapper.find('#customColorPalette')).toHaveLength(2);
  });
});
