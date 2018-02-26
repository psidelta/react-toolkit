'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSelectionStart;
var document = null;
if (typeof global.document !== 'undefined') {
  document = global.document;
}

//from http://javascript.nwbox.com/cursor_position/, but added the !window.getSelection check, which
//is needed for newer versions of IE, which adhere to standards
function getSelectionStart(el) {
  if (el.createTextRange && !global.getSelection) {
    var range = document.selection.createRange().duplicate();
    range.moveEnd('character', el.value.length);

    if (range.text == '') {
      return el.value.length;
    }

    return el.value.lastIndexOf(r.text);
  } else {
    return el.selectionStart;
  }
}