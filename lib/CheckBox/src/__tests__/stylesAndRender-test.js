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
    expect(img.innerHTML).to.equal('valid JSX');
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
    expect(img.innerHTML).to.equal('valid JSX');
    expect(img.style.color).to.equal('yellow');
    expect(img.style.border).to.equal('red');
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
    expect(img.innerHTML).to.equal('valid JSX');
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
    expect(img.style.width).to.equal('30px');
    expect(img.style.height).to.equal('60px');
    checkbox.unmount();
  });

  it('should apply readOnlyClassName correctly', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      { readOnly: true, readOnlyClassName: 'cls-onlyread' },
      'hello'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    expect(node.className).to.contain('cls-onlyread');
    checkbox.unmount();
  });

  it('should apply disabledClassName correctly', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      { disabled: true, disabledClassName: 'dsbld' },
      'hello'
    ));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    expect(node.className).to.contain('dsbld');
    checkbox.unmount();
  });

  it('should apply iconClassName correctly', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(
      _CheckBox2.default,
      { iconClassName: 'simple-icon' },
      'hello'
    ));
    var found = !!(0, _reactDom.findDOMNode)(checkbox).querySelector('.simple-icon');
    expect(found).to.equal(true);
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
    expect(img.className).to.equal('testClassName');
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
    expect(node.tabIndex).to.equal(-1);
    checkbox.unmount();
  });

  it('should have tabIndex 0 if is not disabled', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { uncheckedIconSrc: 'dummy-icon' }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    expect(node.tabIndex).to.be.equal(0);
    checkbox.unmount();
  });

  it('should have tabIndex if is not disabled, and there are no child elements', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { uncheckedIconSrc: 'dummy-icon', tabIndex: 1 }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    expect(node.tabIndex).to.be.equal(1);
    checkbox.unmount();
  });

  it('should apply a custom disabledStyle if provided', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      uncheckedIconSrc: 'dummy-icon',
      disabled: true,
      disabledStyle: { color: 'magenta', border: '1px solid yellow' }
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    expect(node.style.color).to.equal('magenta');
    expect(node.style.border).to.equal('1px solid yellow');
    checkbox.unmount();
  });

  it('should apply a custom readonlyStyle if provided', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      uncheckedIconSrc: 'dummy-icon',
      readOnly: true,
      readOnlyStyle: { color: 'magenta', border: '1px solid yellow' }
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    expect(node.style.color).to.equal('magenta');
    expect(node.style.border).to.equal('1px solid yellow');
    checkbox.unmount();
  });
});