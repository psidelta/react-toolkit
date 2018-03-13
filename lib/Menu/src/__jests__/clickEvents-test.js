'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('../MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _enzyme = require('enzyme');

var _getSubMenu = require('../utils/getSubMenu');

var _getSubMenu2 = _interopRequireDefault(_getSubMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('click events', function () {
  describe('onClick', function () {
    it('should work on direct children', function () {
      var items = [{ label: 'test' }];
      var onClick = jest.fn();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { onClick: onClick, items: items }));

      wrapper.find(_MenuItem2.default).first().simulate('click');

      expect(onClick).toHaveBeenCalled();
      expect(onClick.mock.calls[0].length).toBe(3);
      expect(onClick.mock.calls[0][1].index).toBe(0);
    });

    xit('should not be called when a submenu item had been clicked', function () {
      var items = [{ label: 'test', items: [{ label: 'submenu item' }] }];
      var onClick = jest.fn();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items, onClick: onClick }));

      wrapper.find(_MenuItem2.default).first().simulate('mouseEnter');

      var subMenu = (0, _getSubMenu2.default)(wrapper);

      expect(subMenu).to.exist;
      subMenu.find(_MenuItem2.default).simulate('click');

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('onChildClick', function () {
    xit('should be called only from items from submenus', function () {
      var items = [{ label: 'test', items: [{ label: 'submenu item' }] }];
      var onClick = jest.fn();
      var onChildClick = jest.fn();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items, onClick: onClick, onChildClick: onChildClick }));

      wrapper.find(_MenuItem2.default).first().simulate('mouseEnter');

      var subMenu = (0, _getSubMenu2.default)(wrapper);

      expect(subMenu).to.exist;
      subMenu.find(_MenuItem2.default).simulate('click');

      expect(onClick).not.toHaveBeenCalled();
      expect(onChildClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('item.onClick', function () {
    it('should be called', function () {
      var onClick = jest.fn();
      var items = [{ label: 'test', onClick: onClick }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
      wrapper.find(_MenuItem2.default).first().simulate('click');
      expect(onClick).toHaveBeenCalled();
    });
  });
});