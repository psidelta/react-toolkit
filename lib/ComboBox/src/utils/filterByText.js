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

var _hightlightText = require('./hightlightText');

var _hightlightText2 = _interopRequireDefault(_hightlightText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checkes if label contains text
 * @param  {String} label
 * @param  {String} text
 * @return {Bool}
 */
var defaultFilterFunction = function defaultFilterFunction(_ref) {
  var label = _ref.label,
      text = _ref.text,
      mode = _ref.mode;

  label = label.toLowerCase ? label.toLowerCase() : '' + label;
  text = text.toLowerCase ? text.toLowerCase() : '' + text;
  return mode === 'contains' ? label.indexOf(text) !== -1 : label.startsWith(text);
};

/**
 * Filters data source by text
 * @param {Array} data
 * @param {function} getDisplayProperty
 * @param {String} text
 * @return {Array} sortedData
 */
function filterByText(_ref2) {
  var data = _ref2.data,
      getFilterProperty = _ref2.getFilterProperty,
      text = _ref2.text,
      _ref2$filterFunction = _ref2.filterFunction,
      filterFunction = _ref2$filterFunction === undefined ? defaultFilterFunction : _ref2$filterFunction,
      _ref2$mode = _ref2.mode,
      mode = _ref2$mode === undefined ? 'contains' : _ref2$mode,
      hightlight = _ref2.hightlight;

  if (!Array.isArray(data)) {
    return null;
  }

  var filteredData = data.reduce(function (acc, item) {
    var label = getFilterProperty(item);
    var match = filterFunction({ label: label, text: text, item: item, mode: mode });

    if (match) {
      if (hightlight) {
        var newItem = _extends({}, item, {
          mode: mode,
          matchText: (0, _hightlightText2.default)({
            queryText: text,
            text: label
          })
        });
        acc.push(newItem);
      } else {
        acc.push(item);
      }
    }

    return acc;
  }, []);

  return filteredData;
}

exports.default = filterByText;