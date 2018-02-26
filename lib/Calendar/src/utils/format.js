'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toMoment = require('../toMoment');

var _toMoment2 = _interopRequireDefault(_toMoment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONFIG = {
  // the format in which days should be displayed in month view
  dayFormat: 'D',

  // the format in which months should be displayed in year view
  monthFormat: 'MMMM',

  // the format in which years should be displayed in decade view
  yearFormat: 'YYYY'
}; /**
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

var f = function f(mom, format) {
  return (0, _toMoment2.default)(mom).format(format);
};

exports.default = {
  day: function day(mom, format) {
    return f(mom, format || CONFIG.dayFormat);
  },
  month: function month(mom, format) {
    return f(mom, format || CONFIG.monthFormat);
  },
  year: function year(mom, format) {
    return f(mom, format || CONFIG.yearFormat);
  }
};