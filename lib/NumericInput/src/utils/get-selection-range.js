'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSelectedRange;

var _getSelectionStart = require('./get-selection-start');

var _getSelectionStart2 = _interopRequireDefault(_getSelectionStart);

var _getSelectionEnd = require('./get-selection-end');

var _getSelectionEnd2 = _interopRequireDefault(_getSelectionEnd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO can be utils function
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

function getSelectedRange(dom) {
  var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _api$getSelectionEnd = api.getSelectionEnd,
      getSelectionEnd = _api$getSelectionEnd === undefined ? _getSelectionEnd2.default : _api$getSelectionEnd,
      _api$getSelectionStar = api.getSelectionStart,
      getSelectionStart = _api$getSelectionStar === undefined ? _getSelectionStart2.default : _api$getSelectionStar;


  return {
    start: getSelectionStart(dom),
    end: getSelectionEnd(dom)
  };
}