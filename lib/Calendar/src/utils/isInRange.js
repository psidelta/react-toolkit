'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

exports.default = function (moment, configOrRange) {
  var range = configOrRange;
  var inclusive = true;

  if (!Array.isArray(configOrRange) && (typeof configOrRange === 'undefined' ? 'undefined' : _typeof(configOrRange)) == 'object') {
    range = configOrRange.range;

    if (configOrRange.inclusive !== undefined) {
      inclusive = !!configOrRange.inclusive;
    }
  }

  var start = range[0];
  var end = range.length >= 2 && range[range.length - 1];

  if (!moment) {
    return false;
  }

  if (start && end) {
    var insideRange = start.isBefore(moment) && end.isAfter(moment);

    return inclusive ? insideRange || start.isSame(moment) || end.isSame(moment) : insideRange;
  }

  return false;
};