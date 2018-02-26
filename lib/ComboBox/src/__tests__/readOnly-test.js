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

var dataSource = [{
  label: 'test',
  id: 1
}, {
  label: 'test2',
  id: 2
}];

describe('readOnly', function () {
  it('value cannot be changed', function () {
    var onChange = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_ComboBox2.default, {
      dataSource: dataSource,
      defaultValue: 1,
      readOnly: true,
      onChange: onChange
    }));
    var instance = wrapper.instance();
    expect(instance.getValue()).to.equal(1);
    instance.setValue(2);
    expect(instance.getValue()).to.equal(1);
    expect(onChange.called).to.be.false;
  });
});