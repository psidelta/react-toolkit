'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('../MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('submenu', function () {
  xit('should render on mouseEnter', function () {
    var items = [{ label: 'test', items: [{ label: 'submenu item' }] }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));

    expect(wrapper.instance().subMenu).to.not.exist;
    wrapper.find(_MenuItem2.default).first().simulate('mouseEnter');

    expect(wrapper.instance().subMenu).to.exist;
    expect(wrapper.instance().subMenu.props.subMenu).to.be.true;
  });
});