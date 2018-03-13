'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Button', function () {
  it('onClick is called when button is clicked', function () {
    var onClick = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { onClick: onClick }));
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('toggles between pressed true and false onclick when pressed has value', function () {
    var onToggle = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { onToggle: onToggle, defaultPressed: false }));
    expect(wrapper.instance().isPressed()).toBe(false);
    wrapper.simulate('click');
    expect(wrapper.instance().isPressed()).toBe(true);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
  it('onActivate is called when the button receives mouse down', function () {
    var onActivate = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { onActivate: onActivate }));
    wrapper.simulate('mouseDown');
    expect(onActivate).toHaveBeenCalledTimes(1);
  });
  it('onDeactivate is called whe button is active and registeres a mouseUp on global', function () {
    var mouseupEvent = new CustomEvent('mouseup', { bubbles: true });
    var onDeactivate = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { onDeactivate: onDeactivate }));
    wrapper.simulate('mouseDown');
    global.dispatchEvent(mouseupEvent);
    expect(onDeactivate).toHaveBeenCalledTimes(1);
  });
  it('style is applied on buton', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { id: 'button', style: { color: 'red' } }));
    expect(wrapper.find('#button').props().style.color).toEqual('red');
  });
  it('calls style if a function and applies the style on button', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { id: 'button', style: function style() {
        return { color: 'red' };
      } }));
    expect(wrapper.find('#button').props().style.color).toEqual('red');
  });
});