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

var ROOT_CLASS = _Menu2.default.defaultProps.rootClassName; /**
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

describe('disabled', function () {
  it('should not call onClick', function () {
    var items = [{ label: 'test', disabled: true }];
    var onClick = sinon.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { onClick: onClick, items: items }));

    wrapper.find(_MenuItem2.default).first().simulate('click');
    expect(onClick.called).to.be.false;
  });

  xit('should not call onChildClick', function () {
    var subMenu = void 0;
    var items = [{
      label: 'test',
      items: [{
        label: 'submenu item',
        disabled: true
      }]
    }];
    var onChildClick = sinon.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { onChildClick: onChildClick, items: items }));

    // open submenu
    wrapper.find(_MenuItem2.default).first().simulate('mouseEnter');
    subMenu = (0, _getSubMenu2.default)(wrapper);
    expect(subMenu).to.exist;

    subMenu.find(_MenuItem2.default).first().simulate('click');

    expect(onChildClick.called).to.be.false;
  });

  it('should not trigger onClick when Enter key is pressed on focused item', function () {
    var subMenu = void 0;
    var onClick = sinon.spy();
    var items = [{
      label: 'test',
      disabled: true,
      items: [{
        label: 'submenu item',
        disabled: true
      }]
    }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { onClick: onClick, enableKeyboardNavigation: true, items: items }));

    wrapper.find(_MenuItem2.default).first().simulate('keyPress', { key: 'Enter' });
    expect(onClick.called).to.be.false;
  });

  xit('should apply disabled style if provided', function () {
    var disabledStyle = {
      background: 'red',
      fontSize: 40
    };
    var items = [{
      disabled: true,
      disabledStyle: disabledStyle
    }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
    var appliedStyle = wrapper.find(_MenuItem2.default).first().find('tr').props().style;
    expect(appliedStyle.background).to.equal('red');
    expect(appliedStyle.fontSize).to.equal(40);
  });

  xit('should apply disabled style with higher precedence if provided', function () {
    var itemDisabledStyle = {
      background: 'orange'
    };

    var disabledStyle = {
      background: 'red'
    };

    var items = [{
      disabled: true,
      disabledStyle: disabledStyle,
      itemDisabledStyle: itemDisabledStyle
    }];

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
    var appliedStyle = wrapper.find(_MenuItem2.default).first().find('tr').props().style;

    expect(appliedStyle.background).to.equal('red');
  });

  it('adds --disabled className', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: [{ label: 'test', disabled: true }] }));
    var test = wrapper.find(_MenuItem2.default).find('tr').hasClass(ROOT_CLASS + '__row--disabled');
    expect(test).to.be.true;
  });
});