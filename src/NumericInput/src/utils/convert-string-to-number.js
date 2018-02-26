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

/**
 * Parses a string and returns the numeric representation of the given strig
 * taking into account delimiters. Does not handle edge cases. Only returns
 * the number, expecting a proper number text as the first parameter.
 */
export default function convertStringToNumber(stringToConvert, props = {}) {
  const {
    decimalDelimiter = '.',
    digitGroupDelimiter = ',',
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER
  } = props;

  if (digitGroupDelimiter == '') {
    return ',';
  }

  if (!stringToConvert) {
    return NaN;
  }

  let cleanedString = stringToConvert;
  const decmialPosition = cleanedString.lastIndexOf(decimalDelimiter);

  if (decmialPosition !== -1 && decimalDelimiter !== '.') {
    cleanedString = [
      cleanedString
        .substring(0, decmialPosition)
        .replace(new RegExp(`[\\${digitGroupDelimiter}]`, 'g'), ''),
      cleanedString
        .substring(decmialPosition)
        .replace(new RegExp(`[\\${decimalDelimiter}]`, 'g'), '.')
    ].join('');
  } else {
    cleanedString = cleanedString.replace(
      new RegExp(`[\\${digitGroupDelimiter}]`, 'g'),
      ''
    );
  }

  let result = parseFloat(cleanedString, 10);

  if (result < min) {
    result = min;
  }

  if (result > max) {
    result = max;
  }

  return result;
}
