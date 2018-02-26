'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRgb = exports.toColorValue = exports.toPure = exports.toHsv = exports.toColor = exports.toAlpha = exports.fromRatio = undefined;

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toColor(color) {
  return (0, _tinycolor2.default)(color);
} /**
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

function toPure(color) {
  var h = toColor(color).toHsl().h;
  return toColor({ h: h, s: 100, l: 50, a: 1 });
}

function fromRatio(color) {
  return _tinycolor2.default.fromRatio(color);
}

function toAlpha(color, alpha) {
  if (alpha > 1) {
    alpha = alpha / 100;
  }

  color = toColor(color).toRgb();
  color.a = alpha;

  return toColor(color);
}

function toRgb(color) {
  return toColor(color).toRgb();
}

function toHsv(color) {
  var c = toColor(color).toHsv();

  return {
    h: parseInt(c.h),
    v: c.v.toFixed(2) * 1,
    s: c.s.toFixed(2) * 1
  };
}

function toColorValue(color) {
  return typeof color == 'string' ? toHsv(color) : color;
}

exports.default = {
  fromRatio: fromRatio,
  toAlpha: toAlpha,
  toColor: toColor,
  toHsv: toHsv,
  toPure: toPure,
  toColorValue: toColorValue
};
exports.fromRatio = fromRatio;
exports.toAlpha = toAlpha;
exports.toColor = toColor;
exports.toHsv = toHsv;
exports.toPure = toPure;
exports.toColorValue = toColorValue;
exports.toRgb = toRgb;