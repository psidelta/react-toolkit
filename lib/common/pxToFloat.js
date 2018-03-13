'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function pxToFloat(str) {
  if (typeof str !== 'string') {
    return null;
  }
  return parseFloat(str.replace('px', ''));
}

exports.default = pxToFloat;