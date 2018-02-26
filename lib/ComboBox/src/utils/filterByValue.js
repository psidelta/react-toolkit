'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isSelected = require('./isSelected');

var _isSelected2 = _interopRequireDefault(_isSelected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterByValue(_ref) {
  var data = _ref.data,
      getIdProperty = _ref.getIdProperty,
      value = _ref.value;

  return data.filter(function (item) {
    var id = getIdProperty(item);
    return !(0, _isSelected2.default)({ id: id, value: value });
  });
} /**
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

exports.default = filterByValue;