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

import internalGetDecimalDelimiter from './get-decimal-delimiter';
import internalDigitGroupDelimiter from './get-digit-group-delimiter';
import internalConvertStringToNumber from './convert-string-to-number';

const getDecimalDelimiterPosition = (string, decimalDelimiter) => {
  const position = string && string.indexOf(decimalDelimiter);
  return position !== -1 ? position : false;
};

const countDecimalDigits = (string, decimalDelimiter, decimalPosition) => {
  const position = decimalPosition || getDecimalDelimiterPosition(string, decimalDelimiter);

  if (Number.isNaN(position)) {
    return 0;
  }

  if (typeof position === 'number' && position < string.length) {
    return string.length - position - 1;
  }

  return 0;
};

export default function getTransformedStringValues(stringInput, props = {}, internalApi = {}) {
  if (typeof stringInput !== 'string') {
    stringInput += '';
  }

  if (!stringInput) {
    return ['', null];
  }

  stringInput = stringInput.replace(/[^0-9\,\.\-\+]/g, '');

  if (stringInput === '-' || stringInput === '-.') {
    return [stringInput, null];
  }

  const {
    locale,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    sufix,
    prefix
  } = props;

  let precision = props.precision || null;

  if (precision > 20) {
    precision = 20;
  }

  const {
    getDecimalDelimiter = internalGetDecimalDelimiter,
    getDigitGroupDelimiter = internalDigitGroupDelimiter,
    convertStringToNumber = internalConvertStringToNumber
  } = internalApi;

  const decimalDelimiter = getDecimalDelimiter(locale);

  if (stringInput === decimalDelimiter) {
    return [stringInput, null];
  }

  const decimalDelimiterPosition = getDecimalDelimiterPosition(stringInput, decimalDelimiter);
  let decimalDigitsInInput = countDecimalDigits(
    stringInput,
    decimalDelimiter,
    decimalDelimiterPosition
  );

  // if we have more decimal digits than what we allow
  if (precision || (precision === 0 && decimalDigitsInInput > precision)) {
    stringInput = stringInput.substring(0, stringInput.length - (decimalDigitsInInput - precision));
  }

  let parsedResult = convertStringToNumber(stringInput, {
    digitGroupDelimiter: getDigitGroupDelimiter(locale),
    decimalDelimiter,
    min,
    max
  });

  if (Number.isNaN(parsedResult)) {
    return ['', null];
  }

  const numberWasClamped = parsedResult === min || parsedResult === max;

  if (numberWasClamped) {
    decimalDigitsInInput = 0;
  }

  const formatingOptions = {
    maximumFractionDigits: precision ? Math.min(precision, 20) : 20,
    minimumFractionDigits: Math.min(precision || decimalDigitsInInput, 20)
  };

  let stringRepresentation = parsedResult.toLocaleString(locale, formatingOptions);

  if (
    !precision &&
    !numberWasClamped &&
    !decimalDigitsInInput &&
    decimalDelimiterPosition === stringInput.length - 1
  ) {
    stringRepresentation += '.';
  }

  if (prefix) {
    stringRepresentation = `${prefix} ${stringRepresentation}`;
  }

  if (sufix) {
    stringRepresentation = `${stringRepresentation} ${sufix}`;
  }

  return [stringRepresentation, parsedResult];
}

export { countDecimalDigits, getDecimalDelimiterPosition };
