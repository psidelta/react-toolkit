import tinyColor from 'tinycolor2';

function isColorValid(color) {
  return tinyColor(color).isValid();
}

export default isColorValid;
