'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Expander = require('../Expander');

var _Expander2 = _interopRequireDefault(_Expander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
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

var ROOT_CLASS = _Menu2.default.defaultProps.rootClassName;

describe('rtl', function () {
  var items = [{ label: 'test', items: [{ label: 'submenu item' }] }, { label: 'test2' }];
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { rtl: true, items: items }));

  it('rtl prop is passed to expender', function () {
    expect(wrapper.find(_Expander2.default).prop('rtl')).to.be.true;
  });

  it('should have ' + ROOT_CLASS + '--rtl className', function () {
    expect(wrapper.find('.' + ROOT_CLASS).at(0).hasClass(ROOT_CLASS + '--rtl')).to.be.true;
  });
});