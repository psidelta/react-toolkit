'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWeekDayNames;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_WEEK_START_DAY = (0, _moment2.default)().startOf('week').format('d') * 1; /**
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

function getWeekDayNames(startDay, locale) {
  var weekDays = void 0;
  if (locale) {
    var data = _moment2.default.localeData(locale);

    weekDays = data && data._weekdaysShort ? data._weekdaysShort : weekDays;
  }

  weekDays = (weekDays || _moment2.default.weekdaysShort()).concat();
  var names = weekDays;
  var index = startDay == null ? DEFAULT_WEEK_START_DAY : startDay;

  while (index > 0) {
    names.push(names.shift());
    index--;
  }

  return names;
}