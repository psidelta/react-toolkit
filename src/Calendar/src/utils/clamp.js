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

const clamp = (value, { min, max, circular = true }) => {
  return value < min ? circular ? max : min : value > max ? circular ? min : max : value;
};

export const clampHour = (value, { max, min, circular }) => {
  return clamp(value, { min: min || 0, max: max || 23, circular });
};

export const clampMinute = (value, { circular }) => {
  return clamp(value, { min: 0, max: 59, circular });
};

export const clampSecond = (value, { circular }) => {
  return clamp(value, { min: 0, max: 59, circular });
};

const MAP = {
  second: clampSecond,
  seconds: clampSecond,
  minute: clampMinute,
  minutes: clampMinute,
  hour: clampHour,
  hours: clampHour
};

export const clampNamed = (name, value, { circular, max, min }) => {
  return MAP[name](value, { circular, max, min });
};

export default clamp;
