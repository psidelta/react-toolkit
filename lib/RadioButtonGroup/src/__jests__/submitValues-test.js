'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _enzyme = require('enzyme');

var _RadioButtonGroup = require('../RadioButtonGroup');

var _RadioButtonGroup2 = _interopRequireDefault(_RadioButtonGroup);

var _testUtils = require('./../testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    var rbg = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'rbgName' }));
    var input = rbg.find('input[name="rbgName"]');
    expect(input.prop('type')).toEqual('hidden');
  });

  it('should not be rendered when prop name is not provided', function () {
    var rbg = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options })); //note there is no name here
    var input = rbg.find('input');
    expect(input.exists()).toEqual(false);
  });

  it('should not be rendered when is disabled', function () {
    var rbg = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'anyValue', disabled: true }));
    var input = rbg.find('input');
    expect(input.exists()).toEqual(false);
  });

  it('should not render if shouldSubmit prevents this', function () {
    var rbg = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'validName', shouldSubmit: false }));
    var input = rbg.find('input');
    expect(input.exists()).toEqual(false);
  });

  it('should render if shouldSubmit allows this', function () {
    var rbg = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'validName', shouldSubmit: true }));
    var input = rbg.find('input');
    expect(input.exists()).toEqual(true);
  });

  it('should not render if shouldSubmit() prevents this', function () {
    var rbg = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'validName', shouldSubmit: function shouldSubmit() {
        return false;
      } }));
    var input = rbg.find('input');
    expect(input.exists()).toEqual(false);
  });

  it('should render if shouldSubmit() allows this', function () {
    var rbg = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'validName', shouldSubmit: function shouldSubmit() {
        return true;
      } }));
    var input = rbg.find('input');
    expect(input.exists()).toEqual(true);
  });

  it('should log a warning if showWarnings and shouldSubmit() returns true, but no name provided', function () {
    var thrownMessage = void 0;
    var spiedConsoleWarn = function spiedConsoleWarn(message) {
      thrownMessage = message;
    };
    if (typeof console !== 'undefined') {
      var originalConsoleWarning = console.warn;
      console.warn = spiedConsoleWarn;
      var rbg = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, shouldSubmit: function shouldSubmit() {
          return true;
        } }));
      console.warn = originalConsoleWarning;
      expect(thrownMessage).toContain('shouldSubmit function returned true, but "name" prop is missing');
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
      var rbg = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, {
        radioOptions: options,
        showWarnings: false,
        shouldSubmit: function shouldSubmit() {
          return true;
        }
      }));
      console.warn = originalConsoleWarning;
      expect(errorMessageWasNotLogged).toEqual(true);
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
      var rbg = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, shouldSubmit: true }));
      console.error = originalConsoleError;
      expect(thrownMessage).toContain('requires prop "name" to be submitted');
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
      var rbg = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, value: 'checked' }));
      console.error = originalConsoleError;
      expect(loggedError).toContain('"value" prop is not supported. Use "radioValue" instead.');
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
      var rbg = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, defaultValue: 'checked' }));
      console.error = originalConsoleError;
      expect(loggedError).toContain('"defaultValue" prop is not supported. Use "defaultRadioValue" instead.');
    }
  });

  it('should submit empty string instead of null uncheckedValue', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_RadioButtonGroup2.default, { radioOptions: options, name: 'someValue' }));
    var input = wrapper.find('input');
    expect(input.prop('value')).toEqual(undefined);
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