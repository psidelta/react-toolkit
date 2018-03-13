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

var _module = require('module');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Menu2.default.defaultProps.rootClassName;

describe('keyboard navigation', function () {
  describe('className', function () {
    it('--focused className is applied to the focused item', function () {
      var items = [{ label: 'test', items: [{ label: 'submenu item' }] }, { label: 'test2' }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { enableKeyboardNavigation: true, items: items }));

      wrapper.setState({ focusedItem: 0 });
      expect(wrapper.find(_MenuItem2.default).first().find('tr').hasClass(ROOT_CLASS + '__row--focused')).toBe(true);

      wrapper.setState({ focusedItem: 1 });
      expect(wrapper.find(_MenuItem2.default).at(1).find('tr').hasClass(ROOT_CLASS + '__row--focused')).toBe(true);

      wrapper.setState({ focusedItem: 0 });
      expect(wrapper.find(_MenuItem2.default).first().find('tr').hasClass(ROOT_CLASS + '__row--focused')).toBe(true);
    });
  });

  describe('navigation with arrows', function () {
    it('simple navigation', function () {
      var items = [{
        label: 'test',
        items: [{ label: 'submenu item' }]
      }, { label: 'test2' }, { label: 'test3' }, { label: 'test5' }, { label: 'test4' }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { enableKeyboardNavigation: true, defaultFocusedItem: 0, items: items }));

      // 1 down
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.state('focusedItem')).toBe(1);

      // 2 down
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.state('focusedItem')).toBe(3);

      // 3 up
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      expect(wrapper.state('focusedItem')).toBe(0);
    });

    it('should not excede min limit - focusedItem cannot be < 0', function () {
      var items = [{ label: 'test', items: [{ label: 'submenu item' }] }, { label: 'test2' }, { label: 'test2' }, { label: 'test3' }];
      var min = 0;
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { enableKeyboardNavigation: true, defaultFocusedItem: 0, items: items }));

      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      expect(wrapper.state('focusedItem')).toBe(min);

      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      expect(wrapper.state('focusedItem')).toBe(min);

      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      expect(wrapper.state('focusedItem')).toBe(min);
    });

    it('should not excede max limit, focusedItem cannot be < items.length - 1', function () {
      var items = [{ label: 'test', items: [{ label: 'submenu item' }] }, { label: 'test2' }, { label: 'test2' }, { label: 'test3' }];
      var max = items.length - 1;
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { enableKeyboardNavigation: true, defaultFocusedItem: max, items: items }));

      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.state('focusedItem')).toBe(max);

      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.state('focusedItem')).toBe(max);

      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.state('focusedItem')).toBe(max);
    });
  });

  describe('submenu', function () {
    var items = void 0;
    var wrapper = void 0;
    var submenu = void 0;

    beforeEach(function () {
      items = [{
        label: 'test',
        items: [{ label: 'submenu item' }, { label: 'submenu item 2' }, { label: 'submenu item 3' }]
      }, { label: 'test2' }];
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { defaultFocusedItem: 0, enableKeyboardNavigation: true, items: items }));

      // open submenu
      wrapper.simulate('keyDown', { key: 'ArrowRight' });

      // get a reference to submenu
      submenu = (0, _getSubMenu2.default)(wrapper);
    });

    afterEach(function () {
      wrapper.unmount();
    });

    it('should open on arrow right and close on left', function () {
      wrapper.simulate('keyDown', { key: 'ArrowLeft' });
      expect((0, _getSubMenu2.default)(wrapper)).toBe(null);
    });

    it('should be navigable', function () {
      var items = [{
        label: 'test',
        items: [{ label: 'submenu item' }, { label: 'submenu item 2' }, { label: 'submenu item 3' }]
      }, { label: 'test2' }];

      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { defaultFocusedItem: 0, enableKeyboardNavigation: true, items: items }));

      wrapper.simulate('keyDown', { key: 'ArrowRight' });
      wrapper.simulate('keyDown', { key: 'ArrowRight' });
      var menuClass = 'zippy-react-toolkit-menu';
      var menuRowClass = 'zippy-react-toolkit-menu__row';
      // first item should be focused

      var menuItems = wrapper.find('.' + menuRowClass);

      expect(menuItems.at(0).props().className).toContain(menuRowClass + '--focused');

      // // navigate arrow down
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.find('.' + menuRowClass).at(0).props().className).not.toContain(menuRowClass + '--focused');
      expect(wrapper.find('.' + menuRowClass).at(1).props().className).toContain(menuRowClass + '--focused');

      // // navigate arrow up
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      expect(wrapper.find('.' + menuRowClass).at(0).props().className).toContain(menuRowClass + '--focused');
      expect(wrapper.find('.' + menuRowClass).at(1).props().className).not.toContain(menuRowClass + '--focused');
    });

    xit('should close itself on arrow left', function () {
      // shoud close it self on arrow left
      submenu.simulate('keyDown', { key: 'ArrowLeft' });
      submenu = (0, _getSubMenu2.default)(wrapper);
      expect(submenu).toBe(null);
    });

    xit('should close itself on arrow left, after it was navigated up and down', function () {
      // navigate
      submenu.simulate('keyDown', { key: 'ArrowDown' });
      submenu.simulate('keyDown', { key: 'ArrowUp' });

      // close
      submenu.simulate('keyDown', { key: 'ArrowLeft' });
      submenu = (0, _getSubMenu2.default)(wrapper);
      expect(submenu).toBe(null);
    });

    it('first item should have --focused className', function () {
      var items = [{
        label: 'test',
        items: [{ label: 'submenu item' }, { label: 'submenu item 2' }, { label: 'submenu item 3' }]
      }, { label: 'test2' }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { defaultFocusedItem: 0, enableKeyboardNavigation: true, items: items }));
      expect(wrapper.find(_MenuItem2.default).first().find('.' + ROOT_CLASS + '__row--focused').length).toBe(1);
    });

    xit('submenu opened with keyboard, is closed on mouseleave', function (done) {
      submenu.simulate('mouseEnter');
      submenu.simulate('mouseLeave');

      // needs to pass 100ms before it unmounts
      setTimeout(function () {
        // submenu should be null
        submenu = (0, _getSubMenu2.default)(wrapper);
        expect(submenu).toBe(null);

        done();
      }, 20);
    });

    xit('\n        - menu has focus, and a focusedItem\n        - hover over a menu item\n        - submenu opens\n        - if arrow right is pressed on the same menu item, the first item should\n        be focused\n      ', function () {
      var items = [{
        label: 'test',
        items: [{ label: 'submenu item' }, { label: 'submenu item 2' }, { label: 'submenu item 3' }]
      }, { label: 'test2' }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { defaultFocusedItem: 0, enableKeyboardNavigation: true, items: items }));

      // open by mouse enter
      wrapper.find(_MenuItem2.default).first().simulate('mouseEnter');
      submenu = (0, _getSubMenu2.default)(wrapper);

      expect(submenu).to.exist;

      // submenu should have focusedIndex null
      expect(submenu.get(0).state.focusedItem).toBe(null);

      // simulate open on same menu
      wrapper.simulate('keyDown', { key: 'ArrowRight' });
      expect(submenu.get(0).state.focusedItem).toBe(0);
    });
  });

  describe('rtl', function () {
    var items = void 0;
    var wrapper = void 0;
    var submenu = void 0;

    beforeEach(function () {
      items = [{
        label: 'test',
        items: [{ label: 'submenu item' }, { label: 'submenu item 2' }, { label: 'submenu item 3' }]
      }, { label: 'test2' }];
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, {
        rtl: true,
        defaultFocusedItem: 0,
        enableKeyboardNavigation: true,
        items: items
      }));

      // get a reference to submenu
      submenu = (0, _getSubMenu2.default)(wrapper);
    });

    xit('left opens and right closes submenu', function () {
      submenu = (0, _getSubMenu2.default)(wrapper);
      expect(submenu).toBe(null);

      wrapper.simulate('keyDown', { key: 'ArrowLeft' });
      submenu = (0, _getSubMenu2.default)(wrapper);
      expect(submenu).to.exist;

      submenu.simulate('keyDown', { key: 'ArrowRight' });
      submenu = (0, _getSubMenu2.default)(wrapper);
      expect(submenu).toBe(null);
    });
  });
});