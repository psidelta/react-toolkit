'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getRotateStyle(rotateLabel) {
  var rotateValue = void 0;

  if (rotateLabel === true) {
    rotateValue = '90deg';
  } else if (rotateLabel === false) {
    rotateValue = false;
  } else {
    rotateValue = rotateLabel + 'deg';
  }

  var rotateStyle = rotateValue ? { transform: 'rotate(' + rotateValue + ')' } : {};

  return rotateStyle;
}

exports.default = getRotateStyle;