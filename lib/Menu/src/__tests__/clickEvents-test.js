'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('../MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _enzyme = require('enzyme');

var _getSubMenu = require('./getSubMenu');

var _getSubMenu2 = _interopRequireDefault(_getSubMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('click events', function () {
  describe('onClick', function () {
    it('should work on direct children', function () {
      var items = [{ label: 'test' }];
      var onClick = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { onClick: onClick, items: items }));

      wrapper.find(_MenuItem2.default).first().simulate('click');

      expect(onClick.called).to.be.true;
      expect(onClick.args[0]).to.have.length(3);
      expect(onClick.args[0][1].index).to.be.equal(0);
    });

    xit('should not be called when a submenu item had been clicked', function () {
      var items = [{ label: 'test', items: [{ label: 'submenu item' }] }];
      var onClick = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items, onClick: onClick }));

      wrapper.find(_MenuItem2.default).first().simulate('mouseEnter');

      var subMenu = (0, _getSubMenu2.default)(wrapper);

      expect(subMenu).to.exist;
      subMenu.find(_MenuItem2.default).simulate('click');

      expect(onClick.called).to.be.false;
    });
  });

  describe('onChildClick', function () {
    xit('should be called only from items from submenus', function () {
      var items = [{ label: 'test', items: [{ label: 'submenu item' }] }];
      var onClick = sinon.spy();
      var onChildClick = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items, onClick: onClick, onChildClick: onChildClick }));

      wrapper.find(_MenuItem2.default).first().simulate('mouseEnter');

      var subMenu = (0, _getSubMenu2.default)(wrapper);

      expect(subMenu).to.exist;
      subMenu.find(_MenuItem2.default).simulate('click');

      expect(onClick.called).to.be.false;
      expect(onChildClick.calledOnce).to.be.true;
    });
  });

  describe('item.onClick', function () {
    it('should be called', function () {
      var onClick = sinon.spy();
      var items = [{ label: 'test', onClick: onClick }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
      wrapper.find(_MenuItem2.default).first().simulate('click');
      expect(onClick.called).to.be.true;
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