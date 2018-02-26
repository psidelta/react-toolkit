'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('../MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Expander = require('../Expander');

var _Expander2 = _interopRequireDefault(_Expander);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('props passed from items[0] to MenuItem', function () {
  describe('item.style', function () {
    it('item.style gets applied on tr', function () {
      var items = [{ label: 'test', style: { color: 'item color' } }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
      expect(wrapper.find(_MenuItem2.default).find('tr').prop('style').color).to.equal(items[0].style.color);
    });

    // overwrite is already tested in cellStyle
    it('item.overStyle is added on tr when menuitem receives mouseEnter', function () {
      var items = [{ label: 'test', overStyle: { color: 'over color' } }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
      var menuItem = wrapper.find(_MenuItem2.default).first().find('tr');
      expect(menuItem.prop('style').color).to.not.equal(items[0].overStyle.color);
      menuItem.simulate('mouseEnter');
      expect(menuItem.prop('style').color).to.equal(items[0].overStyle.color);
    });

    it('item.overClassName is added on tr when menuitem receives mouseEnter', function () {
      var items = [{ label: 'test', overClassName: 'over-className' }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
      var menuItem = wrapper.find(_MenuItem2.default).first().find('tr');
      expect(menuItem.prop('className')).to.not.contain('over-className');
      menuItem.simulate('mouseEnter');
      expect(menuItem.prop('className')).to.contain('over-className');
    });

    it('item.overStyle global.overStyle', function () {
      var items = [{ label: 'test', overStyle: { color: 'over color' } }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { overStyle: { color: 'global over color' }, items: items }));
      var menuItem = wrapper.find(_MenuItem2.default).first().find('tr');

      menuItem.simulate('mouseEnter');
      expect(menuItem.prop('style').color).to.equal(items[0].overStyle.color);
    });

    xit('item.disabled is added on tr if item.disabled is true', function () {
      var items = [{
        label: 'test',
        disabled: true,
        disabledStyle: { color: 'disabled color' }
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
      var menuItem = wrapper.find(_MenuItem2.default).first().find('tr');
      expect(menuItem.prop('style').color).to.not.equal(items[0].disabled.color);
    });

    xit('item.disabledStyle global.disabledStyle', function () {
      var items = [{
        label: 'test',
        disabled: true,
        disabledStyle: { color: 'over color' }
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { disabledStyle: { color: 'global over color' }, items: items }));
      var menuItem = wrapper.find(_MenuItem2.default).first().find('tr');

      menuItem.simulate('mouseEnter');
      expect(menuItem.prop('style').color).to.equal(items[0].disabledStyle.color);
    });

    it('item.cellStyle is added on td', function () {
      var items = [{ label: 'test', cellStyle: { color: 'cell color' } }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
      expect(wrapper.find(_MenuItem2.default).first().find('td').first().prop('style').color).to.equal(items[0].cellStyle.color);
    });

    it('item.expanderStyle style should be aplied on expander', function () {
      var items = [{
        label: 'test',
        expanderStyle: { color: 'expander color' },
        items: [{ label: 'test1' }]
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
      expect(wrapper.find(_Expander2.default).prop('style').color).to.equal(items[0].expanderStyle.color);
    });

    xit('should apply submenuMaxHeight property', function () {
      var items = [{ label: 'main menu', items: [{ label: 'submenu item' }] }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items, submenuMaxHeight: 77 }));

      wrapper.find(_MenuItem2.default).first().simulate('mouseEnter');

      // setTimeout(() => {
      var menu = wrapper.find(_Menu2.default).at(1);
      expect(menu.props().maxHeight).to.equal(77);
      //testing the rendered html
      expect(menu.html().indexOf('max-height: 77px')).not.to.equal(-1);
      //   done()
      // })
    });
  });

  describe('item.expander', function () {
    it('should render custom expander', function () {
      var items = [{
        label: 'test',
        expander: function expander() {
          return _react2.default.createElement('div', { id: 'itemExpander' });
        },

        items: [{ label: 'test 2' }]
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
      expect(wrapper.find('#itemExpander')).to.have.length(1);
    });
    it('item.expander should overwrite global expander prop', function () {
      var items = [{
        label: 'test',
        expander: function expander() {
          return _react2.default.createElement('div', { id: 'itemExpander' });
        },

        items: [{ label: 'test 2' }]
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items, expander: function expander() {
          return _react2.default.createElement('div', { id: 'globalExapnder' });
        } }));

      expect(wrapper.find('#itemExpander')).to.have.length(1);
    });
  });
}); /**
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