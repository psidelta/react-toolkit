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

var bottomPositions = {
  'tl-br': true,
  'tc-bc': true,
  'tl-bl': true,
  'tr-br': true,
  'tr-bl': true

  /**
   * Returns true whether the overlay is posiitoned at the bottom of the target.
   *
   * @param  {String}  position
   * @return {Boolean}
   */
};function isPositionBottom(position) {
  return !!bottomPositions[position];
}

exports.default = isPositionBottom;