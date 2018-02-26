'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _leftPad = require('../utils/leftPad');

var _leftPad2 = _interopRequireDefault(_leftPad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var value = _ref.value,
      _ref$separator = _ref.separator,
      separator = _ref$separator === undefined ? ':' : _ref$separator,
      meridiem = _ref.meridiem;

  var parts = value.split(separator);

  var hours = parts[0];
  var minutes = parts[1];
  var seconds = parts[2];

  var result = { hours: hours, minutes: minutes };

  if (typeof seconds == 'string' && seconds.length) {
    result.seconds = seconds;
  }

  if (meridiem && seconds !== undefined && seconds * 1 != seconds) {
    result.seconds = (0, _leftPad2.default)(parseInt(seconds, 10));
  }

  if (meridiem && seconds === undefined && minutes * 1 != minutes) {
    result.minutes = (0, _leftPad2.default)(parseInt(minutes, 10));
  }

  if (meridiem) {
    var meridiems = ['am', 'AM', 'pm', 'PM'];
    var indexes = meridiems.map(function (m) {
      return (seconds || minutes).indexOf(m);
    });

    indexes.forEach(function (indexOf, i) {
      if (indexOf != -1) {
        result.meridiem = meridiems[i];
      }
    });
  }

  return result;
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