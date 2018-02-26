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

import moment from 'moment';
const DEFAULT_WEEK_START_DAY = moment().startOf('week').format('d') * 1;

export default function getWeekDayNames(startDay, locale) {
  let weekDays;
  if (locale) {
    const data = moment.localeData(locale);

    weekDays = data && data._weekdaysShort ? data._weekdaysShort : weekDays;
  }

  weekDays = (weekDays || moment.weekdaysShort()).concat();
  const names = weekDays;
  let index = startDay == null ? DEFAULT_WEEK_START_DAY : startDay;

  while (index > 0) {
    names.push(names.shift());
    index--;
  }

  return names;
}
