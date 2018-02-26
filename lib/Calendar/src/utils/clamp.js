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

var clamp = function clamp(value, _ref) {
  var min = _ref.min,
      max = _ref.max,
      _ref$circular = _ref.circular,
      circular = _ref$circular === undefined ? true : _ref$circular;

  return value < min ? circular ? max : min : value > max ? circular ? min : max : value;
};

var clampHour = exports.clampHour = function clampHour(value, _ref2) {
  var max = _ref2.max,
      min = _ref2.min,
      circular = _ref2.circular;

  return clamp(value, { min: min || 0, max: max || 23, circular: circular });
};

var clampMinute = exports.clampMinute = function clampMinute(value, _ref3) {
  var circular = _ref3.circular;

  return clamp(value, { min: 0, max: 59, circular: circular });
};

var clampSecond = exports.clampSecond = function clampSecond(value, _ref4) {
  var circular = _ref4.circular;

  return clamp(value, { min: 0, max: 59, circular: circular });
};

var MAP = {
  second: clampSecond,
  seconds: clampSecond,
  minute: clampMinute,
  minutes: clampMinute,
  hour: clampHour,
  hours: clampHour
};

var clampNamed = exports.clampNamed = function clampNamed(name, value, _ref5) {
  var circular = _ref5.circular,
      max = _ref5.max,
      min = _ref5.min;

  return MAP[name](value, { circular: circular, max: max, min: min });
};

exports.default = clamp;