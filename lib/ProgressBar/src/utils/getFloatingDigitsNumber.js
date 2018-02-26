'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getFloatingDigitsNumber(number) {
  var parts = number.toString().split('.');

  if (parts.length === 1) {
    return 0;
  } else {
    return parts[1].length;
  }
}

exports.default = getFloatingDigitsNumber;