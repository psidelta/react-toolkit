'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _CheckBox = require('../CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _testUtils = require('../testUtils');

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

var INDETERMINATE = 'indeterminate_test_value';
var UNCHECKED = 'unchecked_test_value';
var CHECKED = 'checked_test_value';

describe('Hidden submit input', function () {
  it('should be rendered when prop name is provided', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { name: 'checkboxName' }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input[name="checkboxName"]');
    expect(input.type).to.equal('hidden');
    checkbox.unmount();
  });

  it('should not be rendered when prop name is not provided', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, null)); //note there is no name here
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input).to.equal(null);
    checkbox.unmount();
  });

  it('should not be rendered when is disabled', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { name: 'anyValue', disabled: true }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input).to.equal(null);
    checkbox.unmount();
  });

  it('should not render if shouldSubmit prevents this', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { name: 'validName', shouldSubmit: false }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input).to.equal(null);
    checkbox.unmount();
  });

  it('should render if shouldSubmit allows this', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { name: 'validName', shouldSubmit: true }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input).not.to.equal(null);
    checkbox.unmount();
  });

  it('should not render if shouldSubmit() prevents this', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { name: 'validName', shouldSubmit: function shouldSubmit() {
        return false;
      } }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input).to.equal(null);
    checkbox.unmount();
  });

  it('should render if shouldSubmit() allows this', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { name: 'validName', shouldSubmit: function shouldSubmit() {
        return true;
      } }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input).not.to.equal(null);
    checkbox.unmount();
  });

  it('should log a warning if showWarnings and shouldSubmit() returns true, but no name provided', function () {
    var thrownMessage = void 0;
    var spiedConsoleWarn = function spiedConsoleWarn(message) {
      thrownMessage = message;
    };
    if (typeof console !== 'undefined') {
      var originalConsoleWarning = console.warn;
      console.warn = spiedConsoleWarn;
      var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { shouldSubmit: function shouldSubmit() {
          return true;
        } }));
      console.warn = originalConsoleWarning;
      expect(thrownMessage).to.contain('shouldSubmit function returned true, but "name" prop is missing');
      checkbox.unmount();
    }
  });

  it('should not log a warning if showWarnings is disabled and shouldSubmit() returns true, but no name provided', function () {
    var errorMessageWasNotLogged = true;
    var spiedConsoleWarn = function spiedConsoleWarn(message) {
      errorMessageWasNotLogged = false;
    };
    if (typeof console !== 'undefined') {
      var originalConsoleWarning = console.warn;
      console.warn = spiedConsoleWarn;
      var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { showWarnings: false, shouldSubmit: function shouldSubmit() {
          return true;
        } }));
      console.warn = originalConsoleWarning;
      expect(errorMessageWasNotLogged).to.equal(true);
      checkbox.unmount();
    }
  });

  it('should throw error if shouldSubmit, but no name provided', function () {
    var thrownMessage = void 0;
    var spiedConsoleError = function spiedConsoleError(message) {
      thrownMessage = message;
    };
    if (typeof console !== 'undefined') {
      var originalConsoleError = console.error;
      console.error = spiedConsoleError;
      var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { shouldSubmit: true }));
      console.error = originalConsoleError;
      expect(thrownMessage).to.contain('requires prop "name" to be submitted');
      checkbox.unmount();
    }
  });

  it('should throw error if value is provided, as we used checked to set the state instead', function () {
    var loggedError = void 0;
    var spiedConsoleError = function spiedConsoleError(message) {
      loggedError = message;
    };
    if (typeof console !== 'undefined') {
      var originalConsoleError = console.error;
      console.error = spiedConsoleError;
      var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { value: 'checked' }));
      console.error = originalConsoleError;
      expect(loggedError).to.contain('"value" prop is not supported. Use "checked" instead.');
      checkbox.unmount();
    }
  });

  it('should throw error if defaultValue is provided, as we used checked to set the state instead', function () {
    var loggedError = void 0;
    var spiedConsoleError = function spiedConsoleError(message) {
      loggedError = message;
    };
    if (typeof console !== 'undefined') {
      var originalConsoleError = console.error;
      console.error = spiedConsoleError;
      var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { defaultValue: 'checked' }));
      console.error = originalConsoleError;
      expect(loggedError).to.contain('"defaultValue" prop is not supported. Use "checked" instead.');
      checkbox.unmount();
    }
  });

  it('should submit indeterminateSubmitValue if specified', function () {
    //null is the default indeterminateValue
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      name: 'someValue',
      checked: null,
      supportIndeterminate: true,
      indeterminateSubmitValue: INDETERMINATE
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input.value).to.equal(INDETERMINATE);
    checkbox.unmount();
  });

  it('should submit indeterminateValue when indeterminateSubmitValue is not specified', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      name: 'someValue',
      supportIndeterminate: true,
      checked: INDETERMINATE,
      indeterminateValue: INDETERMINATE
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input.value).to.equal(INDETERMINATE);
    checkbox.unmount();
  });

  it('should submit empty string instead of null indeterminateValue', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      name: 'someValue',
      supportIndeterminate: true,
      checked: null,
      indeterminateValue: null
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input.value).to.equal('');
    checkbox.unmount();
  });

  it('should submit uncheckedSubmitValue if specified', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { name: 'someValue', uncheckedSubmitValue: UNCHECKED }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input.value).to.equal(UNCHECKED);
    checkbox.unmount();
  });

  it('should submit uncheckedValue when uncheckedSubmitValue is not specified', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { name: 'someValue', uncheckedValue: UNCHECKED }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input.value).to.equal(UNCHECKED);
    checkbox.unmount();
  });

  it('should submit empty string instead of null uncheckedValue', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { name: 'someValue', uncheckedValue: null }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input.value).to.equal('');
    checkbox.unmount();
  });

  it('should submit checkedSubmitValue if specified', function () {
    //null is the default indeterminateValue
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { name: 'someValue', checked: true, checkedSubmitValue: CHECKED }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input.value).to.equal(CHECKED);
    checkbox.unmount();
  });

  it('should submit checkedValue when checkedSubmitValue is not specified', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { name: 'someValue', checked: CHECKED, checkedValue: CHECKED }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input.value).to.equal(CHECKED);
    checkbox.unmount();
  });

  it('should log a warning if checkedSubmitValue is null', function () {
    if (typeof console !== 'undefined') {
      var thrownMessage = void 0;
      var originalConsoleError = console.error;
      var spiedConsoleError = function spiedConsoleError(message) {
        thrownMessage = message;
        originalConsoleError(message);
      };
      console.error = spiedConsoleError;
      var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { checkedSubmitValue: null }));
      console.error = originalConsoleError;
      expect(thrownMessage).to.contain('checkedSubmitValue is null');
      checkbox.unmount();
    }
  });

  it('should log a warning if uncheckedSubmitValue is null', function () {
    if (typeof console !== 'undefined') {
      var thrownMessage = void 0;
      var originalConsoleError = console.error;
      var spiedConsoleError = function spiedConsoleError(message) {
        thrownMessage = message;
        originalConsoleError(message);
      };
      console.error = spiedConsoleError;
      var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { uncheckedSubmitValue: null }));
      console.error = originalConsoleError;
      expect(thrownMessage).to.contain('uncheckedSubmitValue is null');
      checkbox.unmount();
    }
  });

  it('should log a warning if indeterminateSubmitValue is null', function () {
    if (typeof console !== 'undefined') {
      var thrownMessage = void 0;
      var originalConsoleError = console.error;
      var spiedConsoleError = function spiedConsoleError(message) {
        thrownMessage = message;
        originalConsoleError(message);
      };
      console.error = spiedConsoleError;
      var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { indeterminateSubmitValue: null }));
      console.error = originalConsoleError;
      expect(thrownMessage).to.contain('indeterminateSubmitValue is null');
      checkbox.unmount();
    }
  });

  it('should submit empty string instead of null checkedValue', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { name: 'someValue', checked: null, checkedValue: null }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var input = node.querySelector('input');
    expect(input.value).to.equal('');
    checkbox.unmount();
  });
});