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

function assign(target) {
  if (target === null || target === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  for (var _len = arguments.length, to = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    to[_key - 1] = arguments[_key];
  }

  to.forEach(function (toItem) {
    toItem = Object(toItem);
    Object.keys(toItem).forEach(function (key) {
      target[key] = toItem[key];
    });
  });

  return target;
}

exports.default = typeof Object.assign === 'function' ? Object.assign : assign;