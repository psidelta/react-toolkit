'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _CheckBox = require('../CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _testUtils = require('../../../common/testUtils');

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
describe('BrowserNative', function () {
  it('should render indeterminate when there is custom value', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      {
        supportIndeterminate: true,
        browserNative: true,
        checked: 5,
        indeterminateValue: 5
      },
      '1'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox).querySelector('input');
    expect(node.indeterminate).to.equal(true);

    checkbox.rerender(_react2.default.createElement(_CheckBox2.default, {
      supportIndeterminate: true,
      browserNative: true,
      checked: 'yes',
      checkedValue: 'yes',
      indeterminateValue: 5
    }));
    expect(node.indeterminate).to.equal(false);
    expect(node.checked).to.equal(true);

    checkbox.unmount();
  });
});