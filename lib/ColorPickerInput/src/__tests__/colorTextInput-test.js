'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ColorPickerInput = require('../ColorPickerInput');

var _ColorPickerInput2 = _interopRequireDefault(_ColorPickerInput);

var _ColorTextInput = require('../../../ColorTextInput');

var _ColorTextInput2 = _interopRequireDefault(_ColorTextInput);

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

describe('ColorTextInput', function () {
  it('adds colorTextInputProps on ColorTextInput', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ColorPickerInput2.default, {
      colorTextInputProps: { id: 'colorTextInput' }
    }));
    expect(wrapper.find(_ColorTextInput2.default).at(0).props().id).to.equal('colorTextInput');
  });
  it('adds onTextChange, text, defaultText to ColorTextInput', function () {
    var props = {
      onTextChange: function onTextChange() {},
      text: 'text',
      defaultText: 'defaultText'
    };
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ColorPickerInput2.default, props));

    expect(wrapper.find(_ColorTextInput2.default).at(0).props().onTextChange).to.equal(props.onTextChange);

    expect(wrapper.find(_ColorTextInput2.default).at(0).props().text).to.equal('text');

    expect(wrapper.find(_ColorTextInput2.default).at(0).props().defaultText).to.equal('defaultText');
  });
  it('renderColorTextInput overwrites ComponentTextProps by mutating the props', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ColorPickerInput2.default, {
      renderColorTextInput: function renderColorTextInput(_ref) {
        var colorTextInputProps = _ref.colorTextInputProps;

        colorTextInputProps.id = "customId";
      }
    }));
    expect(wrapper.find(_ColorTextInput2.default).at(0).props().id).to.equal('customId');
  });
  it('renderColorTextInput overwrites the ColorTextInput by returning JSX', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ColorPickerInput2.default, {
      renderColorTextInput: function renderColorTextInput(_ref2) {
        var colorTextInputProps = _ref2.colorTextInputProps;

        return _react2.default.createElement('div', { id: 'customColorTextInput' });
      }
    }));
    expect(wrapper.find(_ColorTextInput2.default)).to.have.length(0);
    expect(wrapper.find('#customColorTextInput')).to.have.length(1);
  });
});