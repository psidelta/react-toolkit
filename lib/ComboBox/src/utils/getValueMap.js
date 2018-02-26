"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var contains = function contains(stack, needle) {
  for (var i = 0; i < stack.length; i++) {
    if (stack[i] == needle) {
      return true;
    }
  }
  return false;
};

/**
 * Returns an object that holds the items
 * asociated with the value.
 * @param  {String|Number|String[]|Number[]} value
 * @param  {Object} dataMap
 * @return {Object}
 */

function getValueMap(_ref) {
  var value = _ref.value,
      dataMap = _ref.dataMap,
      oldValueMap = _ref.oldValueMap;

  if (value == null) {
    return oldValueMap;
  }

  var valueMap = _extends({}, oldValueMap);

  value = Array.isArray(value) ? value : [value];

  // clean up extra values which are not in the "value" array
  valueMap = Object.keys(valueMap).reduce(function (acc, id) {
    if (contains(value, id)) {
      acc[id] = valueMap[id];
    }
    // if (value.indexOf(id) !== -1) {
    //   acc[id] = valueMap[id];
    // }
    return acc;
  }, {});

  value.forEach(function (id) {
    if (dataMap && dataMap[id]) {
      valueMap[id] = dataMap[id];
    }
  });

  return valueMap;
}

exports.default = getValueMap;