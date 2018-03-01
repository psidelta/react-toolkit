"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Adjusts the sizes of the boxes taking into account their offset.
 * @param {[type]} boxes [description]
 */
function correctBoxesSizeWithOffset(boxes) {
  return boxes.map(function (box) {
    if (box.offset) {
      var newBox = _extends({}, box);

      if (box.offset.top) {
        newBox.height += box.offset.top;
      }
      if (box.offset.bottom) {
        newBox.height += box.offset.bottom;
      }
      if (box.offset.left) {
        newBox.width += box.offset.left;
      }
      if (box.offset.right) {
        newBox.width += box.offset.right;
      }

      return newBox;
    }

    return box;
  });
}

exports.default = correctBoxesSizeWithOffset;