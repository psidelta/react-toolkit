"use strict";

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
 * Returns the first index that is non disabled
 * if all items are disabled then null is returned
 * @param  {Object[]} items
 * @return {Number} index
 */
function getFirstNonDisabledItem(items) {
  var fistNonDisabledItemIndex = null;
  if (!items || items && !items.length) {
    return null;
  }
  for (var i = 0, len = items.length; i < len; i++) {
    var item = items[i];
    if (item && !item.disabled && !item.isTitle) {
      fistNonDisabledItemIndex = i;
      break;
    }
  }

  return fistNonDisabledItemIndex;
}

exports.default = getFirstNonDisabledItem;