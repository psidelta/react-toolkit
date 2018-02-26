'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _CheckBox = require('../CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

require('../../style/index.scss');

var _testUtils = require('../../../common/testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHECKED = 'checked'; /**
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

var INDETERMINATE = 'indeterminate';
var UNCHECKED = 'UNCHECKED';

describe('Interaction tests', function () {
  it('should not call onClick when disabled', function () {
    var onClickCalled = false;
    var check = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      disabled: true,
      onClick: function onClick() {
        onClickCalled = true;
      }
    }));

    var node = (0, _reactDom.findDOMNode)(check);
    (0, _testUtils.simulateMouseEvent)('click', node);
    expect(onClickCalled).to.equal(false);

    check.unmount();
  });

  it('should have pointer-events none', function () {
    var check = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { disabled: true }));

    var node = (0, _reactDom.findDOMNode)(check);
    expect(getComputedStyle(node)['pointer-events']).to.equal('none');
    check.unmount();
  });

  it('should not call onClick when not disabled', function () {
    var onClickCalled = false;
    var check = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      onClick: function onClick() {
        onClickCalled = true;
      }
    }));

    var node = (0, _reactDom.findDOMNode)(check);
    (0, _testUtils.simulateMouseEvent)('click', node);
    expect(onClickCalled).to.equal(true);
    check.unmount();
  });

  it('setChecked(indeterminateValue) should not do anything if the checkbox does not support indeterminate state', function () {
    var check = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      uncheckedIconSrc: 'unchecked-src-x',
      checkedIconSrc: 'checked-dummy-src-y',
      indeterminateValue: 4,
      defaultChecked: true
    }));

    var node = (0, _reactDom.findDOMNode)(check);
    var img = node.querySelector('img');
    expect(img.src).to.contain('/checked-dummy-src-y');
    check.setChecked(4);

    expect(img.src).to.contain('/checked-dummy-src-y');

    check.unmount();
  });
  it('should handle onClick', function () {
    var onClickCalledTimes = 0;
    var clickHandler = function clickHandler() {
      return onClickCalledTimes++;
    };
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { onClick: clickHandler }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    (0, _testUtils.simulateMouseEvent)('click', node);
    expect(onClickCalledTimes).to.equal(1);
    checkbox.unmount();
  });

  it('should check if space is pressed', function () {
    var onKeyDownCalledTimes = 0;
    var keyDownHandler = function keyDownHandler() {
      return onKeyDownCalledTimes++;
    };
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      onKeyDown: keyDownHandler,
      uncheckedIconSrc: 'unchecked-dummy-src-x',
      checkedIconSrc: 'checked-dummy-src-y',
      supportIndeterminate: false
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    expect(img.src).to.contain('/unchecked-dummy-src-x');
    (0, _testUtils.simulateKeyboardEvent)('keydown', node, ' ');
    expect(onKeyDownCalledTimes).to.equal(1);
    expect(img.src).to.contain('/checked-dummy-src-y');
    checkbox.unmount();
  });

  it('should not check if a key different than space is pressed', function () {
    var onKeyDownCalledTimes = 0;
    var keyDownHandler = function keyDownHandler() {
      return onKeyDownCalledTimes++;
    };
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      onKeyDown: keyDownHandler,
      uncheckedIconSrc: 'unchecked-dummy-src',
      checkedIconSrc: 'checked-dummy-src',
      supportIndeterminate: false
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    expect(img.src).to.contain('/unchecked-dummy-src');
    (0, _testUtils.simulateKeyboardEvent)('keydown', node, 'Enter');
    expect(onKeyDownCalledTimes).to.equal(1);
    expect(img.src).to.contain('/unchecked-dummy-src');
    checkbox.unmount();
  });

  it('should check on click when component is not controlled', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      supportIndeterminate: false
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    try {
      expect(img.src).to.contain('unchecked-dummy-url');
      (0, _testUtils.simulateMouseEvent)('click', node);
      expect(img.src).to.contain('/checked-dummy-url');
    } finally {
      checkbox.unmount();
    }
  });

  it('should check on click on icon when iconCheckOnly is set to `true`', function () {
    var onChangeCallTimes = 0;
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      iconCheckOnly: true,
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      supportIndeterminate: false,
      onChange: function onChange() {
        return onChangeCallTimes++;
      }
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    expect(img.src).to.contain('unchecked-dummy-url');
    (0, _testUtils.simulateMouseEvent)('click', img);
    expect(img.src).to.contain('/checked-dummy-url');
    expect(onChangeCallTimes).to.equal(1);
    checkbox.unmount();
  });

  it('should not check on click outside icon when iconCheckOnly is set to `true`', function () {
    var onChangeCallTimes = 0;
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      iconCheckOnly: true,
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      onChange: function onChange() {
        return onChangeCallTimes++;
      },
      supportIndeterminate: false
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    expect(img.src).to.contain('unchecked-dummy-url');
    (0, _testUtils.simulateMouseEvent)('click', node);
    expect(img.src).to.contain('unchecked-dummy-url');
    expect(onChangeCallTimes).to.equal(0);
    checkbox.unmount();
  });

  it('should check on click when component is not controlled with defaultChecked', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      defaultChecked: true
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    expect(img.src).to.contain('/checked-dummy-url');
    (0, _testUtils.simulateMouseEvent)('click', node);
    expect(img.src).to.contain('unchecked-dummy-url');
    checkbox.unmount();
  });

  it('should not go to indeterminate state if supportIndeterminate is false', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      checkedValue: CHECKED,
      uncheckedValue: UNCHECKED,
      supportIndeterminate: false //checked is undefined!
      , checkedIconSrc: CHECKED + '_dummy_src',
      uncheckedIconSrc: UNCHECKED + '_dummy_src',
      indeterminateIconSrc: INDETERMINATE + '_dummy_src'
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    expect(img.src).to.contain(UNCHECKED + '_dummy_src');
    (0, _testUtils.simulateMouseEvent)('click', node);
    expect(img.src).to.contain('/' + CHECKED + '_dummy_src');
    checkbox.unmount();
  });

  it('should not change the state to checked when component is controlled (checked = null -> indeterminate)', function () {
    // null is also the value of indeterminate
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      checked: null,
      supportIndeterminate: true,
      indeterminateIconSrc: 'indeterminate-dummy-url'
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    (0, _testUtils.simulateMouseEvent)('click', node);
    expect(img.src).to.contain('indeterminate-dummy-url');
    checkbox.unmount();
  });

  it('should not change the state to checked when component is controlled (checked = null -> unchecked*)', function () {
    //null is also the value of indeterminate, but this time, supportIndeterminate is false
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      checked: null,
      uncheckedIconSrc: 'unchecked-dummy-url',
      supportIndeterminate: false
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    (0, _testUtils.simulateMouseEvent)('click', node);
    expect(img.src).to.contain('unchecked-dummy-url');
    checkbox.unmount();
  });

  it('should not change the state to checked when component is controlled (checked = "a string -> unchecked")', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      checked: 'a string',
      uncheckedIconSrc: 'unchecked-dummy-url',
      indeterminateIconSrc: 'indeterminate-dummy-url'
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    (0, _testUtils.simulateMouseEvent)('click', node);
    expect(img.src).to.contain('unchecked-dummy-url');
    checkbox.unmount();
  });

  it('should call the onChange when component is controlled', function () {
    var onChangedCalledTimes = 0;
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      checked: 'anything',
      onChange: function onChange() {
        return onChangedCalledTimes++;
      },
      uncheckedIconSrc: 'unchecked-dummy-url',
      indeterminateIconSrc: 'indeterminate-dummy-url'
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    var img = node.querySelector('img');
    (0, _testUtils.simulateMouseEvent)('click', node);
    expect(img.src).to.contain('unchecked-dummy-url');
    expect(onChangedCalledTimes).to.equal(1);
    checkbox.unmount();
  });

  it('should apply focused style if available', function () {
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      defaultChecked: true,
      focusedStyle: { border: '4px solid red' }
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);

    (0, _testUtils.simulateMouseEvent)('click', node);
    (0, _testUtils.simulateMouseEvent)('focus', node);
    expect(node.style.border).to.equal('4px solid red');
    checkbox.unmount();
  });

  it('should call the onFocus event if available', function () {
    var onFocusCallTimes = 0;
    var onFocusHandler = function onFocusHandler() {
      return onFocusCallTimes++;
    };
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      defaultChecked: true,
      onFocus: onFocusHandler
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    (0, _testUtils.simulateMouseEvent)('focus', node);
    expect(onFocusCallTimes).to.equal(1);
    checkbox.unmount();
  });

  it('should call the onBlur event if available', function () {
    var onBlurCallTimes = 0;
    var onBlurHandler = function onBlurHandler() {
      return onBlurCallTimes++;
    };
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, {
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      defaultChecked: true,
      onBlur: onBlurHandler
    }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    (0, _testUtils.simulateMouseEvent)('blur', node);
    expect(onBlurCallTimes).to.equal(1);
    checkbox.unmount();
  });

  it('should not change if disabled', function () {
    var onChangeCallTimes = 0;
    var onChangeHandler = function onChangeHandler() {
      return onChangeCallTimes++;
    };
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { onChange: onChangeHandler, disabled: true }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    (0, _testUtils.simulateMouseEvent)('click', node);
    expect(onChangeCallTimes).to.equal(0);
    checkbox.unmount();
  });

  it('should not change if readonly', function () {
    var onChangeCallTimes = 0;
    var onChangeHandler = function onChangeHandler() {
      return onChangeCallTimes++;
    };
    var checkbox = (0, _testUtils.render)(_react2.default.createElement(_CheckBox2.default, { onChange: onChangeHandler, readOnly: true }));
    var node = (0, _reactDom.findDOMNode)(checkbox);
    (0, _testUtils.simulateMouseEvent)('click', node);
    expect(onChangeCallTimes).to.equal(0);
    checkbox.unmount();
  });
});