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

import leftPad from '../utils/leftPad';

export default ({ value, separator = ':', meridiem }) => {
  const parts = value.split(separator);

  const hours = parts[0];
  const minutes = parts[1];
  const seconds = parts[2];

  const result = { hours, minutes };

  if (typeof seconds == 'string' && seconds.length) {
    result.seconds = seconds;
  }

  if (meridiem && seconds !== undefined && seconds * 1 != seconds) {
    result.seconds = leftPad(parseInt(seconds, 10));
  }

  if (meridiem && seconds === undefined && minutes * 1 != minutes) {
    result.minutes = leftPad(parseInt(minutes, 10));
  }

  if (meridiem) {
    const meridiems = ['am', 'AM', 'pm', 'PM'];
    const indexes = meridiems.map(m => (seconds || minutes).indexOf(m));

    indexes.forEach((indexOf, i) => {
      if (indexOf != -1) {
        result.meridiem = meridiems[i];
      }
    });
  }

  return result;
};
