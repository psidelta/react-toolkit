'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regionAlign = require('@zippytech/region-align');

var _regionAlign2 = _interopRequireDefault(_regionAlign);

var _selectParent = require('../../common/selectParent');

var _selectParent2 = _interopRequireDefault(_selectParent);

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

function getRegionRelativeToParent(child, prentClassName) {
  var parent = (0, _selectParent2.default)('.' + prentClassName, child);
  var menuRegion = _regionAlign2.default.from(parent);
  var thisRegion = _regionAlign2.default.from(child);
  return {
    left: thisRegion.left - menuRegion.left,
    top: thisRegion.top - menuRegion.top,
    width: thisRegion.width,
    height: thisRegion.height
  };
}

exports.default = getRegionRelativeToParent;