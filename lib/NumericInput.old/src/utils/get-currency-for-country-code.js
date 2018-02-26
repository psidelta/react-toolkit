'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCurrencyForCountryCode;

var _countryCurrencyCodes = require('../data/countryCurrencyCodes');

var _countryCurrencyCodes2 = _interopRequireDefault(_countryCurrencyCodes);

var _countries = require('../data/countries');

var _countries2 = _interopRequireDefault(_countries);

var _find = require('./find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var countriesByCountryCode = _countries2.default.reduce(function (accumulator, country) {
  accumulator[country.code] = country.name;
  return accumulator;
}, {}); /**
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

function getCurrencyForCountryCode(locale) {
  var currencyDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'symbol';

  var code = locale.split('-')[1];
  var countryNameByCode = countriesByCountryCode[code];
  if (countryNameByCode) {
    var country = countriesByCountryCode[code] && countriesByCountryCode[code].toLowerCase();
    var currency = (0, _find2.default)(_countryCurrencyCodes2.default, function (countryCode) {
      return (countryCode.countries || []).indexOf(country) !== -1;
    });
    if (currency) {
      return new Number(1).toLocaleString(locale, {
        style: 'currency',
        currency: currency.code,
        currencyDisplay: currencyDisplay
      }).replace(/[0-9\.\,]/g, '');
    }
    return '';
  }
  throw new Error('Cannot get currency based on country code. Country ' + code + ' not found.');
}