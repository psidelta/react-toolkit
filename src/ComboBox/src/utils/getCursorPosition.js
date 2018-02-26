function getCursorPosition(field) {
  let cursorPosition = 0;

  if (document.selection) {
    field.focus();
    let oSel = document.selection.createRange();
    oSel.moveStart('character', -field.value.length);
    cursorPosition = oSel.text.length;
  } else if (field.selectionStart || field.selectionStart == '0') {
    cursorPosition = field.selectionStart;
  }

  return cursorPosition;
}

export default getCursorPosition;
