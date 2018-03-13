'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _CheckBox = require('../CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _testUtils = require('../../../common/testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('Default values', function () {
  it('should render unchecked by default', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      { uncheckedIconSrc: 'unchecked-dummy-url' },
      '1'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    expect(img.src).toContain('unchecked-dummy-url');
    checkbox.unmount();
  });

  it('should be able to set defaultChecked', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      { checkedIconSrc: 'checked-dummy-url', defaultChecked: true },
      '2'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    expect(img.src).toContain('checked-dummy-url');
    checkbox.unmount();
  });

  it('should prioritize checked over defaultChecked', function () {
    var _React$createElement;

    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      (_React$createElement = {
        uncheckedIconSrc: 'unchecked-dummy-url'
      }, _defineProperty(_React$createElement, 'uncheckedIconSrc', 'checked-dummy-url'), _defineProperty(_React$createElement, 'defaultChecked', true), _defineProperty(_React$createElement, 'checked', false), _React$createElement),
      '3'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    expect(img.src).toContain('checked-dummy-url');
    checkbox.unmount();
  });
});