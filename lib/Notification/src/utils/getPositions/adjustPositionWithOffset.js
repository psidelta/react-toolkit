"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
* adjust positions offset
* it is ok to mutate here
* only top/left must take into account
* offset
*/
function adjustPositionWithOffset(positions) {
  return positions.map(function (position) {
    if (!position.offset) {
      return position;
    }

    var newPosition = _extends({}, position);
    if (position.offset.top && newPosition.top !== undefined) {
      newPosition.top += newPosition.offset.top;
    }
    if (newPosition.offset.left && newPosition.left !== undefined) {
      newPosition.left += newPosition.offset.left;
    }
    if (position.offset.bottom && newPosition.bottom !== undefined) {
      newPosition.bottom += newPosition.offset.bottom;
    }
    if (newPosition.offset.right !== undefined && newPosition.right !== undefined) {
      newPosition.right += newPosition.offset.right;
    }

    return newPosition;
  });
}

exports.default = adjustPositionWithOffset;