"use strict";

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

/**
 * Ads the color to the next empty position.
 * If the palette is full it adds the color at
 * the first position.
 * @param {String} color   Color to addColor
 * @param {String[]} palette
 */
function addColor(_ref) {
  var color = _ref.color,
      palette = _ref.palette,
      length = _ref.length;

  if (!color) {
    return palette;
  }
  if (!Array.isArray(palette)) {
    return [color];
  }
  if (palette && palette.length >= length) {
    return [color].concat(_toConsumableArray(palette.slice(1)));
  }

  return [].concat(_toConsumableArray(palette), [color]);
}

exports.default = addColor;