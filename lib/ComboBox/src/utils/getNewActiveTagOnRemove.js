'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clamp = require('../../../common/clamp');

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returs next item that shoud be selected.
 * If the item has something on the right it should change to that one
 * if not it should check the one on the left.
 * @param  {Stirng|Number} id
 * @param  {String[]|Number[]} value
 * @return {String|Number} newActivetag
*/
function getNewActiveTagOnRemove(_ref) {
  var id = _ref.id,
      value = _ref.value,
      dir = _ref.dir;

  dir = dir || -1;
  if (!Array.isArray(value) || value.length === 1) {
    return null;
  }
  var newActiveTag = null;
  var currentIndex = value.indexOf(id);
  var lastIndex = value.length - 1;
  var newIndex = (0, _clamp2.default)(currentIndex + dir, 0, lastIndex);
  if (dir == 1 && currentIndex === lastIndex) {
    newIndex = (0, _clamp2.default)(currentIndex - 1, 0, lastIndex);
  }

  if (dir == -1 && currentIndex == 0 && lastIndex > 0) {
    newIndex = 1;
  }

  newActiveTag = value[newIndex];

  return newActiveTag;
} /**
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

exports.default = getNewActiveTagOnRemove;