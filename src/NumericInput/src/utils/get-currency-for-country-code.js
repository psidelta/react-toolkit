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

import countryCurrencyCodes from '../data/countryCurrencyCodes';
import countries from '../data/countries';
import find from './find';

let countriesByCountryCode = countries.reduce((accumulator, country) => {
  accumulator[country.code] = country.name;
  accumulator[country.code.toLowerCase()] = country.name;
  return accumulator;
}, {});

export default function getCurrencyForCountryCode(
  locale,
  currencyDisplay = 'symbol'
) {
  const code = locale.split('-')[1];
  const countryNameByCode = countriesByCountryCode[code];
  if (countryNameByCode) {
    const country =
      countriesByCountryCode[code] &&
      countriesByCountryCode[code].toLowerCase();
    const currency = find(countryCurrencyCodes, countryCode => {
      return (countryCode.countries || []).indexOf(country) !== -1;
    });
    if (currency) {
      return new Number(1)
        .toLocaleString(locale, {
          style: 'currency',
          currency: currency.code,
          currencyDisplay
        })
        .replace(/[0-9\.\,]/g, '');
    }
    return '';
  } else {
    console.error(
      `Cannot get currency based on country code. Country ${code} not found.`
    );
    return '';
  }
}
