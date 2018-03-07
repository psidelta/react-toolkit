'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('style', function () {
  it('adds pressedStyle when button is pressed', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { id: 'button', pressed: true, pressedStyle: { color: 'red' } }));
    expect(wrapper.find('#button').props().style.color).toEqual('red');
  });
  it('adds focusedStyle when button is focused', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { id: 'button', pressed: true, focusedStyle: { color: 'red' } }));
    wrapper.setState({ focused: true });
    expect(wrapper.find('#button').props().style.color).toEqual('red');
  });
  it('adds overStyle when button is over', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { id: 'button', pressed: true, overStyle: { color: 'red' } }));
    wrapper.setState({ mouseOver: true });
    expect(wrapper.find('#button').props().style.color).toEqual('red');
  });
  it('adds activeStyle when button is active', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { id: 'button', pressed: true, activeStyle: { color: 'red' } }));
    wrapper.setState({ active: true });
    expect(wrapper.find('#button').props().style.color).toEqual('red');
  });
});