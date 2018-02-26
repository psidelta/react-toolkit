'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _ArrowScroller = require('../../../ArrowScroller');

var _ArrowScroller2 = _interopRequireDefault(_ArrowScroller);

var _enzyme = require('enzyme');

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

describe('disableScroller', function () {
  it("when false it doesn't use ArrowScroller", function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Menu2.default, { disableScroller: true }));
    expect(wrapper.find(_ArrowScroller2.default)).to.have.length(0);
  });
});