'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

function rangeFill(length) {
  var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#fff';

  return Array.apply(null, Array(length)).map(function () {
    return fill;
  });
}

/**
 * Returns a palette with empty spaces filled with white
 * @param  {Number} length
 * @param  {String[]} palette
 * @return {String[]}
 */
function getPalette(_ref) {
  var length = _ref.length,
      palette = _ref.palette;

  // check to see if palette is falsey
  // or it has length 0
  if (!palette || palette && palette.length === 0) {
    return rangeFill(length);
  }

  if (length >= palette && palette.length) {
    return palette;
  }

  var emptyColorLength = length - palette.length;
  return [].concat(_toConsumableArray(palette), _toConsumableArray(rangeFill(emptyColorLength)));
}

exports.default = getPalette;