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
    ).to.equal('colorPaletteId');
  });
  it('passes colorPalette as palette to ColorPalette', () => {
    const wrapper = mount(<ColorPickerInput expanded colorPalette="gray" />);
    expect(
      wrapper
        .find(ColorPalette)
        .at(0)
        .props().palette
    ).to.equal('gray');
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
    expect(wrapper.find('#customColorPalette')).to.have.length(1);
    expect(wrapper.find(ColorPalette)).to.have.length(1);
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
    expect(wrapper.find('#customColorPalette')).to.have.length(1);
  });
});
