'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _RadioButtonGroup = require('../RadioButtonGroup');

var _RadioButtonGroup2 = _interopRequireDefault(_RadioButtonGroup);

var _testUtils = require('./../testUtils');

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

var options = [{
  value: 'v1',
  label: 'bananas'
}, {
  value: 'v2',
  label: 'apples'
}, {
  value: 'v3',
  label: 'strawberries'
}, {
  value: 'v4',
  label: 'chocolate'
}];

describe('Hidden submit rbg', function () {
  it('should be rendered when prop name is provided', function () {
    var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'rbgName' }));
    var node = (0, _reactDom.findDOMNode)(rbg);
    var input = node.querySelector('input[name="rbgName"]');
    expect(input.type).to.equal('hidden');
    rbg.unmount();
  });

  it('should not be rendered when prop name is not provided', function () {
    var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options })); //note there is no name here
    var node = (0, _reactDom.findDOMNode)(rbg);
    var input = node.querySelector('input');
    expect(input).to.equal(null);
    rbg.unmount();
  });

  it('should not be rendered when is disabled', function () {
    var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'anyValue', disabled: true }));
    var node = (0, _reactDom.findDOMNode)(rbg);
    var input = node.querySelector('input');
    expect(input).to.equal(null);
    rbg.unmount();
  });

  it('should not render if shouldSubmit prevents this', function () {
    var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'validName', shouldSubmit: false }));
    var node = (0, _reactDom.findDOMNode)(rbg);
    var input = node.querySelector('input');
    expect(input).to.equal(null);
    rbg.unmount();
  });

  it('should render if shouldSubmit allows this', function () {
    var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'validName', shouldSubmit: true }));
    var node = (0, _reactDom.findDOMNode)(rbg);
    var input = node.querySelector('input');
    expect(input).not.to.equal(null);
    rbg.unmount();
  });

  it('should not render if shouldSubmit() prevents this', function () {
    var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'validName', shouldSubmit: function shouldSubmit() {
        return false;
      } }));
    var node = (0, _reactDom.findDOMNode)(rbg);
    var input = node.querySelector('input');
    expect(input).to.equal(null);
    rbg.unmount();
  });

  it('should render if shouldSubmit() allows this', function () {
    var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'validName', shouldSubmit: function shouldSubmit() {
        return true;
      } }));
    var node = (0, _reactDom.findDOMNode)(rbg);
    var input = node.querySelector('input');
    expect(input).not.to.equal(null);
    rbg.unmount();
  });

  it('should log a warning if showWarnings and shouldSubmit() returns true, but no name provided', function () {
    var thrownMessage = void 0;
    var spiedConsoleWarn = function spiedConsoleWarn(message) {
      thrownMessage = message;
    };
    if (typeof console !== 'undefined') {
      var originalConsoleWarning = console.warn;
      console.warn = spiedConsoleWarn;
      var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, shouldSubmit: function shouldSubmit() {
          return true;
        } }));
      console.warn = originalConsoleWarning;
      expect(thrownMessage).to.contain('shouldSubmit function returned true, but "name" prop is missing');
      rbg.unmount();
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
      var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, {
        radioOptions: options,
        showWarnings: false,
        shouldSubmit: function shouldSubmit() {
          return true;
        }
      }));
      console.warn = originalConsoleWarning;
      expect(errorMessageWasNotLogged).to.equal(true);
      rbg.unmount();
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
      var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, shouldSubmit: true }));
      console.error = originalConsoleError;
      expect(thrownMessage).to.contain('requires prop "name" to be submitted');
      rbg.unmount();
    }
  });

  it('should throw error if value is provided, as we used radioValue to set the state instead', function () {
    var loggedError = void 0;
    var spiedConsoleError = function spiedConsoleError(message) {
      loggedError = message;
    };
    if (typeof console !== 'undefined') {
      var originalConsoleError = console.error;
      console.error = spiedConsoleError;
      var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, value: 'checked' }));
      console.error = originalConsoleError;
      expect(loggedError).to.contain('"value" prop is not supported. Use "radioValue" instead.');
      rbg.unmount();
    }
  });

  it('should throw error if defaultValue is provided, as we used radioValue to set the state instead', function () {
    var loggedError = void 0;
    var spiedConsoleError = function spiedConsoleError(message) {
      loggedError = message;
    };
    if (typeof console !== 'undefined') {
      var originalConsoleError = console.error;
      console.error = spiedConsoleError;
      var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, defaultValue: 'checked' }));
      console.error = originalConsoleError;
      expect(loggedError).to.contain('"defaultValue" prop is not supported. Use "defaultRadioValue" instead.');
      rbg.unmount();
    }
  });

  it('should submit empty string instead of null uncheckedValue', function () {
    var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'someValue', uncheckedValue: null }));
    var node = (0, _reactDom.findDOMNode)(rbg);
    var input = node.querySelector('input');
    expect(input.value).to.equal('');
    rbg.unmount();
  });

  xit('should log a warning if checkedSubmitValue is null', function () {
    if (typeof console !== 'undefined') {
      var thrownMessage = void 0;
      var originalConsoleError = console.error;
      var spiedConsoleError = function spiedConsoleError(message) {
        thrownMessage = message;
        originalConsoleError(message);
      };
      console.error = spiedConsoleError;
      var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, checkedSubmitValue: null }));
      console.error = originalConsoleError;
      expect(thrownMessage).to.contain('checkedSubmitValue is null');
      rbg.unmount();
    }
  });

  xit('should log a warning if uncheckedSubmitValue is null', function () {
    if (typeof console !== 'undefined') {
      var thrownMessage = void 0;
      var originalConsoleError = console.error;
      var spiedConsoleError = function spiedConsoleError(message) {
        thrownMessage = message;
        originalConsoleError(message);
      };
      console.error = spiedConsoleError;
      var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, uncheckedSubmitValue: null }));
      console.error = originalConsoleError;
      expect(thrownMessage).to.contain('uncheckedSubmitValue is null');
      rbg.unmount();
    }
  });

  xit('should log a warning if indeterminateSubmitValue is null', function () {
    if (typeof console !== 'undefined') {
      var thrownMessage = void 0;
      var originalConsoleError = console.error;
      var spiedConsoleError = function spiedConsoleError(message) {
        thrownMessage = message;
        originalConsoleError(message);
      };
      console.error = spiedConsoleError;
      var rbg = (0, _testUtils.render)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, indeterminateSubmitValue: null }));
      console.error = originalConsoleError;
      expect(thrownMessage).to.contain('indeterminateSubmitValue is null');
      rbg.unmount();
    }
  });
});