'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
 * Removes value from multiple or single value
 * @return {Array|String|Number|Null} new value
 */
function deselectValue(_ref) {
  var id = _ref.id,
      value = _ref.value,
      _ref$getIdProperty = _ref.getIdProperty,
      getIdProperty = _ref$getIdProperty === undefined ? function (item) {
    return item && item.id;
  } : _ref$getIdProperty;

  var newValue = void 0;
  var singleValueId = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? getIdProperty(value) : value;
  if (id === singleValueId || singleValueId === null) {
    newValue = null;
  }
  if (Array.isArray(value)) {
    newValue = value.filter(function (value) {
      var valueId = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? getIdProperty(value) : value;
      return valueId !== id;
    });
    if (!newValue.length) {
      newValue = null;
    }
  }

  return newValue;
}

exports.default = deselectValue;