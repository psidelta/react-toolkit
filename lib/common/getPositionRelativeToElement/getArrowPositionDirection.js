'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var topPositions = ['top', 'bc-tc', 'bl-tl', 'br-tr'];

var bottomPositions = ['bottom', 'tc-bc', 'tl-bl', 'tr-br'];

var rightPositions = ['right', 'lc-rc', 'tl-tr', 'bl-br'];

var leftPositions = ['left', 'rc-lc', 'tr-tl', 'br-bl'];

var noArrowPositions = ['br-tl', 'tl-br', 'tr-bl'];

function isTopPosition(position) {
  return topPositions.indexOf(position) !== -1;
}

function isBottomPosition(position) {
  return bottomPositions.indexOf(position) !== -1;
}

function isLeftPosition(position) {
  return leftPositions.indexOf(position) !== -1;
}

function isRightPosition(position) {
  return rightPositions.indexOf(position) !== -1;
}

function getArrowPositionDirection(position) {
  var positionTest = {
    top: isTopPosition(position),
    bottom: isBottomPosition(position),
    right: isRightPosition(position),
    left: isLeftPosition(position)
  };

  return Object.keys(positionTest).filter(function (position) {
    return !!positionTest[position];
  })[0];
}

exports.default = getArrowPositionDirection;