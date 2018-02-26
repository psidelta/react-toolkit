let document = null;
if (typeof global.document !== 'undefined') {
  document = global.document;
}

export default function getSelectionEnd(el) {
  if (el.createTextRange && !global.getSelection) {
    const range = document.selection.createRange().duplicate();
    range.moveStart('character', -el.value.length);
    return range.text.length;
  } else {
    return el.selectionEnd;
  }
}
