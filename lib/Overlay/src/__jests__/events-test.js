'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('events', function () {
  it('onShow called when visibile changes to true', function () {
    var onShow = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { onShow: onShow, defaultVisible: false }));
    wrapper.instance().setVisible(true);
    expect(onShow.mock.calls.length).toBe(1);
  });
  it('onHide called when visibile changes to false', function () {
    var onHide = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { onHide: onHide, defaultVisible: true }));
    wrapper.instance().setVisible(false);
    expect(onHide.mock.calls.length).toBe(1);
  });
  it('onVisibleChange is called whenever visibile changes, it is called with new state', function () {
    var onVisibleChange = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { onVisibleChange: onVisibleChange, defaultVisible: true }));
    wrapper.instance().setVisible(false);
    expect(onVisibleChange.mock.calls.length).toBe(1);
    expect(onVisibleChange.mock.calls[0][0]).toBe(false);
  });
});