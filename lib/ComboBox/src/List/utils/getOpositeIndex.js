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
 * Returns the reverse index. It is used when the list
 * is rendered in top position, first item should be at the bottom
 * at last item at the top, so index must be fliped.
 * For index 0, and length 20, oposite index should be 19
 * @param  {Number} index
 * @param  {Number} length
 * @return {Number} oposite index
 */
function getOpositeIndex(index, length) {
  return length - 1 - index;
}

exports.default = getOpositeIndex;