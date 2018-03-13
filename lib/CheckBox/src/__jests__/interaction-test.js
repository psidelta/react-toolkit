'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _enzyme = require('enzyme');

var _CheckBox = require('../CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import '../../style/index.scss';

var CHECKED = 'checked';
var INDETERMINATE = 'indeterminate';
var UNCHECKED = 'UNCHECKED';

describe('Interaction tests', function () {
  it('should not call onClick when disabled', function () {
    var onClickCalled = false;
    var check = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      disabled: true,
      onClick: function onClick() {
        onClickCalled = true;
      }
    }));

    check.simulate('click');
    expect(onClickCalled).toEqual(false);

    check.unmount();
  });

  xit('should have pointer-events none', function () {
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, { disabled: true }));

    var node = (0, _reactDom.findDOMNode)(checkbox);
    expect(getComputedStyle(node)['pointer-events']).toEqual('none');
    checkbox.unmount();
  });

  it('should call onClick when not disabled', function () {
    var onClickCalled = false;
    var check = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      onClick: function onClick() {
        onClickCalled = true;
      }
    }));
    check.simulate('click');
    expect(onClickCalled).toEqual(true);
    check.unmount();
  });

  it('setChecked(indeterminateValue) should not do anything if the checkbox does not support indeterminate state', function () {
    var check = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      uncheckedIconSrc: 'unchecked-src-x',
      checkedIconSrc: 'checked-dummy-src-y',
      indeterminateValue: 4,
      defaultChecked: true
    }));
    var img = check.find('img');
    expect(img.props().src).toContain('checked-dummy-src-y');
    check.instance().setChecked(4);
    img = check.find('img');
    expect(img.props().src).toContain('checked-dummy-src-y');
    check.unmount();
  });

  it('should handle onClick', function () {
    var onClickCalledTimes = 0;
    var clickHandler = function clickHandler() {
      return onClickCalledTimes++;
    };
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, { onClick: clickHandler }));

    checkbox.simulate('click');
    expect(onClickCalledTimes).toEqual(1);
    checkbox.unmount();
  });

  xit('should check if space is pressed', function () {
    var onKeyDownCalledTimes = 0;
    var keyDownHandler = function keyDownHandler() {
      return onKeyDownCalledTimes++;
    };
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      onKeyDown: keyDownHandler,
      uncheckedIconSrc: 'unchecked-dummy-src-x',
      checkedIconSrc: 'checked-dummy-src-y',
      supportIndeterminate: false
    }));
    var img = checkbox.find('img');
    expect(img.props().src).toContain('unchecked-dummy-src-x');
    checkbox.simulate('keydown', ' ');
    expect(onKeyDownCalledTimes).toEqual(1);
    expect(img.props().src).toContain('checked-dummy-src-y');
    checkbox.unmount();
  });

  it('should not check if a key different than Enter is pressed', function () {
    var onKeyDownCalledTimes = 0;
    var keyDownHandler = function keyDownHandler() {
      return onKeyDownCalledTimes++;
    };
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      onKeyDown: keyDownHandler,
      uncheckedIconSrc: 'unchecked-dummy-src',
      checkedIconSrc: 'checked-dummy-src',
      supportIndeterminate: false
    }));
    var img = checkbox.find('img');
    expect(img.props().src).toContain('unchecked-dummy-src');
    checkbox.simulate('keydown', ' ');
    expect(onKeyDownCalledTimes).toEqual(1);
    img = checkbox.find('img');
    expect(img.props().src).toContain('unchecked-dummy-src');
    checkbox.unmount();
  });

  it('should check on click when component is not controlled', function () {
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      supportIndeterminate: false
    }));
    var img = checkbox.find('img');
    try {
      expect(img.props().src).toContain('unchecked-dummy-url');
      checkbox.simulate('click');
      img = checkbox.find('img');
      expect(img.props().src).toContain('checked-dummy-url');
    } finally {
      checkbox.unmount();
    }
  });

  it('should check on click on icon when iconCheckOnly is set to `true`', function () {
    var onChangeCallTimes = 0;
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      iconCheckOnly: true,
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      supportIndeterminate: false,
      onChange: function onChange() {
        return onChangeCallTimes++;
      }
    }));

    var img = checkbox.find('img');
    expect(img.props().src).toContain('unchecked-dummy-url');
    img.simulate('click');
    img = checkbox.find('img');
    expect(img.props().src).toContain('checked-dummy-url');
    expect(onChangeCallTimes).toEqual(1);
    checkbox.unmount();
  });

  it('should not check on click outside icon when iconCheckOnly is set to `true`', function () {
    var onChangeCallTimes = 0;
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      iconCheckOnly: true,
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      onChange: function onChange() {
        return onChangeCallTimes++;
      },
      supportIndeterminate: false
    }));

    var img = checkbox.find('img');
    expect(img.props().src).toContain('unchecked-dummy-url');
    checkbox.simulate('click');
    img = checkbox.find('img');
    expect(img.props().src).toContain('unchecked-dummy-url');
    expect(onChangeCallTimes).toEqual(0);
    checkbox.unmount();
  });

  it('should check on click when component is not controlled with defaultChecked', function () {
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      defaultChecked: true
    }));
    var img = checkbox.find('img');
    expect(img.props().src).toContain('checked-dummy-url');
    checkbox.simulate('click');
    img = checkbox.find('img');
    expect(img.props().src).toContain('unchecked-dummy-url');
    checkbox.unmount();
  });

  it('should not go to indeterminate state if supportIndeterminate is false', function () {
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      checkedValue: CHECKED,
      uncheckedValue: UNCHECKED,
      supportIndeterminate: false //checked is undefined!
      , checkedIconSrc: CHECKED + '_dummy_src',
      uncheckedIconSrc: UNCHECKED + '_dummy_src',
      indeterminateIconSrc: INDETERMINATE + '_dummy_src'
    }));

    var img = checkbox.find('img');
    expect(img.props().src).toEqual(UNCHECKED + '_dummy_src');
    checkbox.simulate('click');

    expect(checkbox.find('img').props().src).toEqual(CHECKED + '_dummy_src');
    checkbox.unmount();
  });

  it('should not change the state to checked when component is controlled (checked = null -> indeterminate)', function () {
    // null is also the value of indeterminate
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      checked: null,
      supportIndeterminate: true,
      indeterminateIconSrc: 'indeterminate-dummy-url'
    }));

    var img = checkbox.find('img');
    checkbox.simulate('click');

    expect(checkbox.find('img').props().src).toContain('indeterminate-dummy-url');
    checkbox.unmount();
  });

  it('should not change the state to checked when component is controlled (checked = null -> unchecked*)', function () {
    //null is also the value of indeterminate, but this time, supportIndeterminate is false
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      checked: null,
      uncheckedIconSrc: 'unchecked-dummy-url',
      supportIndeterminate: false
    }));
    var img = checkbox.find('img');
    checkbox.simulate('click');

    expect(checkbox.find('img').props().src).toContain('unchecked-dummy-url');
    checkbox.unmount();
  });

  it('should not change the state to checked when component is controlled (checked = "a string -> unchecked")', function () {
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      checked: 'a string',
      uncheckedIconSrc: 'unchecked-dummy-url',
      indeterminateIconSrc: 'indeterminate-dummy-url'
    }));

    var img = checkbox.find('img');
    checkbox.simulate('click');
    img = checkbox.find('img');
    expect(img.props().src).toContain('unchecked-dummy-url');
    checkbox.unmount();
  });

  it('should call the onChange when component is controlled', function () {
    var onChangedCalledTimes = 0;
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      checked: 'anything',
      onChange: function onChange() {
        return onChangedCalledTimes++;
      },
      uncheckedIconSrc: 'unchecked-dummy-url',
      indeterminateIconSrc: 'indeterminate-dummy-url'
    }));

    var img = checkbox.find('img');
    checkbox.simulate('click');
    img = checkbox.find('img');
    expect(img.props().src).toContain('unchecked-dummy-url');
    checkbox.unmount();
  });

  it('should apply focused style if available', function () {
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      defaultChecked: true,
      focusedStyle: { border: '4px solid red' }
    }));
    checkbox.simulate('click');
    checkbox.simulate('focus');
    var node = checkbox.find('div').first();
    expect(node.props().style.border).toEqual('4px solid red');
    checkbox.unmount();
  });

  it('should call the onFocus event if available', function () {
    var onFocusCallTimes = 0;
    var onFocusHandler = function onFocusHandler() {
      return onFocusCallTimes++;
    };
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      defaultChecked: true,
      onFocus: onFocusHandler
    }));

    checkbox.simulate('focus');
    expect(onFocusCallTimes).toEqual(1);
    checkbox.unmount();
  });

  it('should call the onBlur event if available', function () {
    var onBlurCallTimes = 0;
    var onBlurHandler = function onBlurHandler() {
      return onBlurCallTimes++;
    };
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, {
      checkedIconSrc: 'checked-dummy-url',
      uncheckedIconSrc: 'unchecked-dummy-url',
      defaultChecked: true,
      onBlur: onBlurHandler
    }));

    checkbox.simulate('blur');
    expect(onBlurCallTimes).toEqual(1);
    checkbox.unmount();
  });

  it('should not change if disabled', function () {
    var onChangeCallTimes = 0;
    var onChangeHandler = function onChangeHandler() {
      return onChangeCallTimes++;
    };
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, { onChange: onChangeHandler, disabled: true }));

    checkbox.simulate('click');
    expect(onChangeCallTimes).toEqual(0);
    checkbox.unmount();
  });

  it('should not change if readonly', function () {
    var onChangeCallTimes = 0;
    var onChangeHandler = function onChangeHandler() {
      return onChangeCallTimes++;
    };
    var checkbox = (0, _enzyme.mount)(_react2.default.createElement(_CheckBox2.default, { onChange: onChangeHandler, readOnly: true }));

    checkbox.simulate('click');
    expect(onChangeCallTimes).toEqual(0);
    checkbox.unmount();
  });
});