import { toColor } from './color';

function toStringValue(color) {
  color = toColor({ ...color });

  return color.toRgb().a == 1 ? color.toHexString() : color.toRgbString();
}

export default toStringValue;
