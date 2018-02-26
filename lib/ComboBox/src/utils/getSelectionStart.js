'use strict';

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
 * Returns the position of the curosr or the start of the selection
 * if there is a selections
 * @param  {node} input
 * @return {Number}
 */
function getSelectionStart(input) {
  if (!input) {
    return null;
  }
  /**
   * from http://javascript.nwbox.com/cursor_position/, but added the !window.getSelection check, which
   * is needed for newer versions of IE, which adhere to standards
   */
  if (input.createTextRange && !global.getSelection) {
    var document = global.document;
    var range = document.selection.createRange().duplicate();
    range.moveEnd('character', input.value.length);
    if (range.text == '') {
      return input.value.length;
    }
    return input.value.lastIndexOf(range.text);
  }

  return input.selectionStart;
}

exports.default = getSelectionStart;