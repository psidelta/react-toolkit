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

/**
 * Style can come from 3 paces, and they overwrite one another:
 * - global cellStyle
 * - column cellStyle
 * - item cellStyle
 */
import React from 'react';
import Menu from '../Menu';
import MenuItemCell from '../MenuItem/MenuItemCell';
import { mount } from 'enzyme';

describe('cellStyle', () => {
  const cellStyle = {
    color: 'global color',
    background: 'global background',
    height: 0,
    width: 1,
    maxHeight: 2,
    maxWidth: 3
  };

  // column overwrites color and max height
  const columnCellStyle = {
    color: 'column color',
    minWidth: 4,
    maxHeight: 5
  };

  // item overwrites maxWidth
  const itemCellStyle = {
    maxWidth: 6
  };

  const wrapper = mount(
    <Menu
      cellStyle={cellStyle}
      columns={[{ name: 'label', style: columnCellStyle }]}
      items={[
        {
          label: 'test',
          style: itemCellStyle
        }
      ]}
    />
  );

  const test = wrapper.find(MenuItemCell).first().prop('style');

  it('width should come from cellStyle', () => {
    expect(test.width).to.equal(cellStyle.width);
  });

  it('color should come from columnCellStyle', () => {
    expect(test.color).to.equal(columnCellStyle.color);
  });

  it('maxWidth should come from item.style', () => {
    expect(test.maxWidth).to.equal(cellStyle.maxWidth);
  });
});
