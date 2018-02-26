'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
 * Returns next non null item.
 * Used to navigate over disabled items.
 * @param  {Object[]} items
 * @param  {Number} [startFrom=0] Index of the current item
 * @param  {Number} [direction=1] In which direction should search for the next item
 * @return {Number}               Index of the next item
 */
function getNextNavigableItem(items) {
  var startFrom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var nextNavigableItem = null;
  if (!items || items && !items.length) {
    return null;
  }

  if (startFrom === null) {
    return null;
  }

  if (direction === 1) {
    for (var i = startFrom + 1, len = items.length; i < len; i++) {
      var item = items[i];
      var isDisabled = item && item.disabled;
      var isSeparator = item === '-';
      var isTitle = item.isTitle;

      if (!isSeparator && !isDisabled && !isTitle) {
        nextNavigableItem = i;
        break;
      }
    }
  } else {
    for (var _i = startFrom - 1; _i >= 0; _i--) {
      var _item = items[_i];
      var _isDisabled = _item && _item.disabled;
      var _isSeparator = _item === '-';
      var _isTitle = _item.isTitle;

      if (!_isSeparator && !_isDisabled && !_isTitle) {
        nextNavigableItem = _i;
        break;
      }
    }
  }

  return nextNavigableItem;
}

exports.default = getNextNavigableItem;