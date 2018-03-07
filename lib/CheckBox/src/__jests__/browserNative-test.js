'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _CheckBox = require('../CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _testUtils = require('../../../common/testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    expect(node.indeterminate).toEqual(true);

    checkbox.rerender(_react2.default.createElement(_CheckBox2.default, {
      supportIndeterminate: true,
      browserNative: true,
      checked: 'yes',
      checkedValue: 'yes',
      indeterminateValue: 5
    }));
    expect(node.indeterminate).toEqual(false);
    expect(node.checked).toEqual(true);

    checkbox.unmount();
  });
});