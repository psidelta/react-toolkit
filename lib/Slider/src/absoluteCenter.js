'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = absoluteCenter;
function absoluteCenter(style) {
  style = style || {};

  style.margin = 'auto';
  style.position = 'absolute';
  style.top = style.bottom = style.left = style.right = 0;

  return style;
}