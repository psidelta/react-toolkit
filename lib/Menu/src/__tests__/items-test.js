'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _getSubMenu = require('./getSubMenu');

var _getSubMenu2 = _interopRequireDefault(_getSubMenu);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('../MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _MenuSeparator = require('../MenuSeparator');

var _MenuSeparator2 = _interopRequireDefault(_MenuSeparator);

var _enzyme = require('enzyme');

var _testUtils = require('../../../common/testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS_NAME = _Menu2.default.defaultProps.rootClassName;

describe('items', function () {
  describe('menuProps', function () {
    it('should be supported on item object', function (done) {
      var items = [{
        country: 'USA',
        menuProps: {
          columns: ['city'],
          padding: 50
        },
        items: [{ city: 'NY' }]
      }];

      // NOTE: could not get submenu reference with enzyme, so fallback to pure React/DOM rendering
      var wrapper = (0, _testUtils.render)(_react2.default.createElement(_Menu2.default, { items: items, columns: ['country'] }));
      var dom = (0, _reactDom.findDOMNode)(wrapper);

      var cells = dom.querySelectorAll('td');

      (0, _testUtils.simulateMouseEvent)('mouseover', cells[0]);

      setTimeout(function () {
        var subMenu = dom.querySelector('.' + ROOT_CLASS_NAME);
        expect(subMenu.textContent).to.equal('NY');
        expect(subMenu.style.padding).to.equal('50px');
        wrapper.unmount();
        done();
      }, 150);
    });
  });
  describe('children length', function () {
    it('correct number of items', function () {
      var items = [{ label: 'test' }, { label: 'test2' }, { label: 'test3' }, { label: 'test4' }, { label: 'test5' }, { label: 'test6' }, { label: 'test7' }];

      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Menu2.default, { items: items }));
      expect(wrapper.find('tbody').children()).to.have.length(items.length);
    });

    it('correct number of items with separator', function () {
      var items = [{ label: 'test' }, { label: 'test2' }, { label: 'test3' }, '-', { label: 'test4' }, { label: 'test5' }, { label: 'test6' }, '-', { label: 'test7' }];

      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Menu2.default, { items: items }));
      expect(wrapper.find('tbody').children()).to.have.length(items.length);
    });
  });

  describe('separator', function () {
    it('1 should be rendered', function () {
      var items = ['-'];
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Menu2.default, { items: items }));
      expect(wrapper.find(_MenuSeparator2.default)).to.have.length(1);
    });
    it('separator should be rendered between items', function () {
      var items = [{ label: 'test1' }, '-', { label: 'test1' }, '-'];
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Menu2.default, { items: items }));
      expect(wrapper.find(_MenuSeparator2.default)).to.have.length(2);
    });
  });
});