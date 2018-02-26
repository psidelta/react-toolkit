'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _CheckBox = require('../../CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _getClassNames = require('../getClassNames');

var _getClassNames2 = _interopRequireDefault(_getClassNames);

var _testUtils = require('../../testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  rtl: true,
  readOnly: true,
  rootClassName: 'zippy-react-toolkit-checkbox'
}; /**
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

describe('getClassNames', function () {
  it('builds correct className', function () {
    var expected = 'zippy-react-toolkit-checkbox zippy-react-toolkit-checkbox--rtl zippy-react-toolkit-checkbox--read-only';

    var className = (0, _getClassNames2.default)(props);

    expect(className).to.contain('zippy-react-toolkit-checkbox');
    expect(className).to.contain('zippy-react-toolkit-checkbox--rtl');
    expect(className).to.contain('zippy-react-toolkit-checkbox--read-only');
  });
});

describe('Check.props.className', function () {
  it('has correct value in the DOM', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { readOnly: true }));
    var node = (0, _reactDom.findDOMNode)(checkbox);

    var className = node.className;

    expect(className).to.contain('zippy-react-toolkit-checkbox');
    expect(className).to.not.contain('zippy-react-toolkit-checkbox--rtl');
    expect(className).to.contain('zippy-react-toolkit-checkbox--read-only');

    checkbox.rerender(_react2.default.createElement(_CheckBox2.default, null));
    expect(node.className).to.not.contain('zippy-react-toolkit-checkbox--read-only');

    checkbox.unmount();
  });
});