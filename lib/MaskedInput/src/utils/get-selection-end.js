'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSelectionEnd;
var document = null;
if (typeof global.document !== 'undefined') {
  document = global.document;
}

function getSelectionEnd(el) {
  if (el.createTextRange && !global.getSelection) {
    var range = document.selection.createRange().duplicate();
    range.moveStart('character', -el.value.length);
    return range.text.length;
  } else {
    return el.selectionEnd;
  }
}