'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ComboBox = require('../ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

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

var ROOT_CLASS = _ComboBox2.default.defaultProps.rootClassName;

describe('Combo style', function () {
  it('adds emptyStyle when combo has value null', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { value: null, emptyStyle: { color: 'empty' } }));
    expect(wrapper.find('.' + ROOT_CLASS).at(0).props().style.color).to.equal('empty');
  });
  it('adds emptyClassName when value is empty', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { value: null, emptyClassName: 'hello' }));
    expect(wrapper.find('.hello')).to.have.length(1);
  });
  it('adds disabledStyle when it is disabled', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { disabled: true, disabledStyle: { color: 'disabled' } }));
    expect(wrapper.find('.' + ROOT_CLASS).at(0).props().style.color).to.equal('disabled');
  });
  it('adds disabledClassName when disabled', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { disabled: true, disabledClassName: 'disabled' }));
    expect(wrapper.find('.disabled')).to.have.length(1);
  });
  it('adds focusedStyle when focused', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { focusedStyle: { color: 'focused' } }));
    wrapper.setState({ focus: true });
    expect(wrapper.find('.' + ROOT_CLASS).at(0).props().style.color).to.equal('focused');
  });
  it('adds focusedClassName when it is focused', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, { focusedClassName: 'focused' }));
    wrapper.setState({ focus: true });
    expect(wrapper.find('.focused')).to.have.length(1);
  });

  describe('inputClassName', function () {
    it('gets applied on the input component', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
        searchable: true,
        text: 'hello world',
        inputClassName: 'customClassName'
      }));
      expect(wrapper.find('.customClassName')).to.have.length(1);
    });
  });

  describe('inputStyle', function () {
    it('getts applied on text input component', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ComboBox2.default, {
        searchable: true,
        text: 'hello world',
        inputStyle: { color: 'red' }
      }));
      expect(wrapper.find(_TextInput2.default).at(0).props().style.color).to.equal('red');
    });
  });
});