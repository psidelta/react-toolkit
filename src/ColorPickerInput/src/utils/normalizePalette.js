function rangeFill(length, fill = '#fff') {
  return Array.apply(null, Array(length)).map(() => fill);
}

/**
 * Returns a palette with empty spaces filled with white
 * @param  {Number} length
 * @param  {String[]} palette
 * @return {String[]}
 */
function getPalette({ length, palette }) {
  // check to see if palette is falsey
  // or it has length 0
  if (!palette || (palette && palette.length === 0)) {
    return rangeFill(length);
  }

  if (length >= palette && palette.length) {
    return palette;
  }

  const emptyColorLength = length - palette.length;
  return [...palette, ...rangeFill(emptyColorLength)];
}

export default getPalette;
