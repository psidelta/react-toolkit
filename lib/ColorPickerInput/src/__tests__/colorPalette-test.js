'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ColorPickerInput = require('../ColorPickerInput');

var _ColorPickerInput2 = _interopRequireDefault(_ColorPickerInput);

var _ColorPalette = require('../../../ColorPalette');

var _ColorPalette2 = _interopRequireDefault(_ColorPalette);

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

describe('ColorPalette Props', function () {
  it('adds colorPaletteProps to ColorPalette', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ColorPickerInput2.default, {
      expanded: true,
      colorPaletteProps: { id: 'colorPaletteId' }
    }));
    expect(wrapper.find(_ColorPalette2.default).at(0).props().id).to.equal('colorPaletteId');
  });
  it('passes colorPalette as palette to ColorPalette', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ColorPickerInput2.default, {
      expanded: true,
      colorPalette: 'gray'
    }));
    expect(wrapper.find(_ColorPalette2.default).at(0).props().palette).to.equal('gray');
  });
  it('renderColorPalette overwrites ColorPalette by returning jsx', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ColorPickerInput2.default, {
      expanded: true,
      renderColorPalette: function renderColorPalette() {
        return _react2.default.createElement('div', { id: 'customColorPalette' });
      }
    }));
    expect(wrapper.find('#customColorPalette')).to.have.length(1);
    expect(wrapper.find(_ColorPalette2.default)).to.have.length(1);
  });
  it('renderColorPalette overwrites ColorPalette by mutating paletteProps', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ColorPickerInput2.default, {
      expanded: true,
      renderColorPalette: function renderColorPalette(config) {
        config.paletteProps.id = 'customColorPalette';
      }
    }));
    expect(wrapper.find('#customColorPalette')).to.have.length(1);
  });
});