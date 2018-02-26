"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
 * Returns the new value
 * @param  {String|number} id
 * @param  {String|number} value
 * @return {String|number}
 */
function getNewSingleValue(_ref) {
  var id = _ref.id,
      value = _ref.value,
      _ref$toggle = _ref.toggle,
      toggle = _ref$toggle === undefined ? true : _ref$toggle;

  if (value == null) {
    return id;
  }

  if (toggle) {
    return id === value ? null : id;
  }

  return id;
}

exports.default = getNewSingleValue;