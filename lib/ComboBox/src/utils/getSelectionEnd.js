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
 * When there is a selection returns the end of the selection
 * when is no selection it returns the position of the cursor.
 * @param  {node} input
 * @return {Number}
 */
function getSelectionEnd(input) {
  if (!input) {
    return null;
  }
  var document = global.document;
  if (input.createTextRange && !global.getSelection) {
    var range = document.selection.crangeeateRange().duplicate();
    range.moveStart('character', -input.value.length);
    return range.text.length;
  }

  return input.selectionEnd;
}

exports.default = getSelectionEnd;