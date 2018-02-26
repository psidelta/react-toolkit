'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getCursorPosition(field) {
  var cursorPosition = 0;

  if (document.selection) {
    field.focus();
    var oSel = document.selection.createRange();
    oSel.moveStart('character', -field.value.length);
    cursorPosition = oSel.text.length;
  } else if (field.selectionStart || field.selectionStart == '0') {
    cursorPosition = field.selectionStart;
  }

  return cursorPosition;
}

exports.default = getCursorPosition;