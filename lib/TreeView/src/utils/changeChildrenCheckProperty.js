'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
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
 * Returns a map with all it children
 * checked or uncheded, depending on
 * check value
 * @param {Object} nodeProps - nodeProps
 * @param {Bool} checked
 * @return {Object} checkMap
 */
function changeChildrenCheckProperty(nodeProps, newState) {
  // if the node is disabled, it and it's children should
  // not change
  if (!nodeProps || nodeProps.disabled) {
    return null;
  }

  var propertyMap = _defineProperty({}, nodeProps.path, newState);

  if (nodeProps.children) {
    var children = nodeProps.children.map(function (child) {
      return changeChildrenCheckProperty(child.props, newState);
    });

    children.forEach(function (child) {
      (0, _objectAssign2.default)(propertyMap, child);
    });
  }

  return propertyMap;
}

exports.default = changeChildrenCheckProperty;