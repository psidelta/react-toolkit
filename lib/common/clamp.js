'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function clamp(value, min, max) {
  if (isNaN(value)) {
    return value;
  }

  var minUndefined = typeof min === 'undefined';
  var maxUndefined = typeof max === 'undefined';
  if (minUndefined && maxUndefined) {
    return value;
  }
  if (minUndefined) {
    if (!maxUndefined) {
      return value > max ? max : value;
    }
  }
  if (maxUndefined) {
    if (!minUndefined) {
      return value < min ? min : value;
    }
  }
  if (min > max) {
    return clamp(value, max, min);
  }
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }

  return value;
}

exports.default = clamp;