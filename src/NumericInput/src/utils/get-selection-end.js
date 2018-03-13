var document = global.document;

module.exports = function getSelectionEnd(o) {
  if (o.createTextRange && !global.getSelection) {
    var r = document.selection.createRange().duplicate();
    r.moveStart('character', -o.value.length);
    return r.text.length;
  }
  return o.selectionEnd;
};
