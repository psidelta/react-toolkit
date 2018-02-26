'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
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

var _findItemIndex = require('./findItemIndex');

var _findItemIndex2 = _interopRequireDefault(_findItemIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the next items id in the list
 * @param  {Function} getIdProperty [description]
 * @param  {Array} data
 * @param  {String|Number} id - current item id
 * @return {String|Number}
 */
function getNextItem(config) {
  var data = config.data,
      id = config.id,
      getIdProperty = config.getIdProperty,
      _config$direction = config.direction,
      direction = _config$direction === undefined ? 1 : _config$direction;

  if (!Array.isArray(data) || !data.length || !getIdProperty || id == null) {
    return null;
  }

  if (data.length === 1) {
    return id;
  }

  /**
   * check if any items are valid targets,
   * if all are disabled return null
  **/
  var enabledItems = data.filter(function (item) {
    return !item.disabled;
  });
  if (enabledItems.length === 0) {
    return null;
  }

  var currentIndex = (0, _findItemIndex2.default)({ data: data, id: id, getIdProperty: getIdProperty });

  var nextIndex = void 0;
  if (direction === 1) {
    nextIndex = currentIndex + 1;
    nextIndex = nextIndex > data.length - 1 ? 0 : nextIndex;
  } else {
    nextIndex = currentIndex - 1;
    nextIndex = nextIndex >= 0 ? nextIndex : data.length - 1;
  }

  var newItem = data[nextIndex];
  var newActiveId = getIdProperty(newItem);

  if (newItem.disabled) {
    newActiveId = getNextItem(_extends({}, config, {
      id: newActiveId
    }));
  }

  return newActiveId;
}

exports.default = getNextItem;