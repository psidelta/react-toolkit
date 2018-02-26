'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItemCell = require('../MenuItem/MenuItemCell');

var _MenuItemCell2 = _interopRequireDefault(_MenuItemCell);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
describe('cellStyle', function () {
  var cellStyle = {
    color: 'global color',
    background: 'global background',
    height: 0,
    width: 1,
    maxHeight: 2,
    maxWidth: 3
  };

  // column overwrites color and max height
  var columnCellStyle = {
    color: 'column color',
    minWidth: 4,
    maxHeight: 5
  };

  // item overwrites maxWidth
  var itemCellStyle = {
    maxWidth: 6
  };

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, {
    cellStyle: cellStyle,
    columns: [{ name: 'label', style: columnCellStyle }],
    items: [{
      label: 'test',
      style: itemCellStyle
    }]
  }));

  var test = wrapper.find(_MenuItemCell2.default).first().prop('style');

  it('width should come from cellStyle', function () {
    expect(test.width).to.equal(cellStyle.width);
  });

  it('color should come from columnCellStyle', function () {
    expect(test.color).to.equal(columnCellStyle.color);
  });

  it('maxWidth should come from item.style', function () {
    expect(test.maxWidth).to.equal(cellStyle.maxWidth);
  });
});