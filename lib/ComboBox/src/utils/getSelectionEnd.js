'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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