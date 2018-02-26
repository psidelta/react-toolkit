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

function clamp(value, min, max) {
  if (isNaN(value)) {
    return value;
  }

  var minUndefined = typeof min === 'undefined';
  var maxUndefined = typeof max === 'undefined';
  if (minUndefined && maxUndefined) {
    return value;
  }
  if (minUndefined) {
    if (!maxUndefined) {
      return value > max ? max : value;
    }
  }
  if (maxUndefined) {
    if (!minUndefined) {
      return value < min ? min : value;
    }
  }
  if (min > max) {
    return clamp(value, max, min);
  }
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }

  return value;
}

exports.default = clamp;