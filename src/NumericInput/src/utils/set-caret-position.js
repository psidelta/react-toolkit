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

export default function setCaretPosition(elem, caretPos) {
  let start = caretPos;
  let end = caretPos;

  if (caretPos && (caretPos.start != undefined || caretPos.end != undefined)) {
    start = caretPos.start || 0;
    end = caretPos.end || start;
  }

  if (elem != null) {
    if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.moveStart('character', start);
      range.moveEnd('character', end);
      range.select();
    } else {
      elem.setSelectionRange(start, end);
    }
  }
}
