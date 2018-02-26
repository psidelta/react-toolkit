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
 * Creates a range from start to end (not including end) using step as increment.
 * @param  {Number} start    Start Value
 * @param  {Number} end      End Value, it is noninclusive
 * @param  {Number} [step=1] Increment Value
 * @return {Array}          Range from start to end
 */
function range() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments[1];
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var collection = [];
  for (var i = start; i < end; i += step) {
    collection.push(i);
  }

  return collection;
}

exports.default = range;