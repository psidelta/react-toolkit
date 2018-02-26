'use strict';

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
var document = global.document;

// from http://javascript.nwbox.com/cursor_position/, but added the !window.getSelection check, which
// is needed for newer versions of IE, which adhere to standards
module.exports = function getSelectionStart(o) {
  if (o.createTextRange && !global.getSelection) {
    var r = document.selection.createRange().duplicate();
    r.moveEnd('character', o.value.length);
    if (r.text == '') return o.value.length;
    return o.value.lastIndexOf(r.text);
  }
  return o.selectionStart;
};