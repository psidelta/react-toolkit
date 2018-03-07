'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _enzyme = require('enzyme');

var _CheckBox = require('../CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _testUtils = require('../../../common/testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Styles and render', function () {
  it('should use a custom renderIcon function', function () {
    var uncheckedIcon = function uncheckedIcon() {
      return _react2.default.createElement(
        'span',
        null,
        'valid JSX'
      );
    };
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      { uncheckedIcon: uncheckedIcon },
      'hello'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('span');
    expect(img.innerHTML).toEqual('valid JSX');
    checkbox.unmount();
  });

  it('should use a custom renderIcon JSX with valid style', function () {
    var uncheckedIcon = _react2.default.createElement(
      'span',
      { style: { border: 'red', color: 'yellow' } },
      'valid JSX'
    );
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      { uncheckedIcon: uncheckedIcon },
      'hello'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('span');
    expect(img.innerHTML).toEqual('valid JSX');
    expect(img.style.color).toEqual('yellow');
    expect(img.style.border).toEqual('red');
    checkbox.unmount();
  });

  it('should use a custom renderIcon JSX with empty style', function () {
    var uncheckedIcon = _react2.default.createElement(
      'span',
      { style: {} },
      'valid JSX'
    );
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      { uncheckedIcon: uncheckedIcon },
      'hello'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('span');
    expect(img.innerHTML).toEqual('valid JSX');
    checkbox.unmount();
  });

  it('should use custom icon size', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      { uncheckedIconSrc: 'dummy-icon', iconSize: [30, 60] },
      'hello'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    expect(img.style.width).toEqual('30px');
    expect(img.style.height).toEqual('60px');
    checkbox.unmount();
  });

  it('should apply readOnlyClassName correctly', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      { readOnly: true, readOnlyClassName: 'cls-onlyread' },
      'hello'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    expect(node.className).toContain('cls-onlyread');
    checkbox.unmount();
  });

  it('should apply disabledClassName correctly', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      { disabled: true, disabledClassName: 'dsbld' },
      'hello'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    expect(node.className).toContain('dsbld');
    checkbox.unmount();
  });

  it('should apply iconClassName correctly', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      { iconClassName: 'simple-icon' },
      'hello'
    ));
    var found = !!(0, _reactDom.findDOMNode)(checkbox).querySelector('.simple-icon');
    expect(found).toEqual(true);
    checkbox.unmount();
  });

  it('should take the iconClassName if available', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      {
        uncheckedIconSrc: 'unchecked-dummy-url',
        iconClassName: 'testClassName'
      },
      'hello'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    expect(img.className).toEqual('testClassName');
    checkbox.unmount();
  });

  it('should not have tabIndex if disabled', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      {
        uncheckedIconSrc: 'unchecked-dummy-url',
        disabled: true,
        tabIndex: 1
      },
      'hello'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    expect(node.tabIndex).toEqual(-1);
    checkbox.unmount();
  });

  it('should have tabIndex 0 if is not disabled', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { uncheckedIconSrc: 'dummy-icon' }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    expect(node.tabIndex).toEqual(0);
    checkbox.unmount();
  });

  it('should have tabIndex if is not disabled, and there are no child elements', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { uncheckedIconSrc: 'dummy-icon', tabIndex: 1 }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    expect(node.tabIndex).toEqual(1);
    checkbox.unmount();
  });

  it('should apply a custom disabledStyle if provided', function () {
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      uncheckedIconSrc: 'dummy-icon',
      disabled: true,
      disabledStyle: { color: 'magenta', border: '1px solid yellow' }
    }));
    var node = checkbox.find('div').first();
    expect(node.props().style.color).toEqual('magenta');
    expect(node.props().style.border).toEqual('1px solid yellow');
  });

  it('should apply a custom readonlyStyle if provided', function () {
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      uncheckedIconSrc: 'dummy-icon',
      readOnly: true,
      readOnlyStyle: { color: 'magenta', border: '1px solid yellow' }
    }));
    var node = checkbox.find('div').first();

    expect(node.props().style.color).toEqual('magenta');
    expect(node.props().style.border).toEqual('1px solid yellow');
  });
});