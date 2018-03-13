'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('methods', function () {
  it('show triggers visible change', function () {
    var onShow = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { onShow: onShow }));
    wrapper.instance().show();
    expect(onShow.mock.calls.length).toBe(1);
    expect(wrapper.instance().getVisible()).toBe(true);
  });
  it('hide triggers visible change', function () {
    var onHide = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { onHide: onHide }));
    wrapper.instance().hide();
    expect(onHide.mock.calls.length).toBe(1);
    expect(wrapper.instance().getVisible()).toBe(false);
  });
});