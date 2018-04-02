/**
 * Ads the color to the next empty position.
 * If the palette is full it adds the color at
 * the first position.
 * @param {String} color   Color to addColor
 * @param {String[]} palette
 */
function addColor({ color, palette, length }) {
  if (!color) {
    return palette;
  }
  if (!Array.isArray(palette)) {
    return [color];
  }
  if (palette && palette.length >= length) {
    return [color, ...palette.slice(1)];
  }

  return [...palette, color];
}

export default addColor;
