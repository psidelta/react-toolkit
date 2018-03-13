'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clamp = require('../../../common/clamp');

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function getLeftPosition(overlayRegion, targetRegion) {
  return targetRegion.left - overlayRegion.left + targetRegion.width / 2;
}

function getTopPosition(overlayRegion, targetRegion) {
  return targetRegion.top - overlayRegion.top + targetRegion.height / 2;
}

function getArrowPosition(_ref) {
  var overlayRegion = _ref.overlayRegion,
      targetRegion = _ref.targetRegion,
      position = _ref.position,
      arrowSize = _ref.arrowSize;

  var arrowPosition = null;

  var left = (0, _clamp2.default)(getLeftPosition(overlayRegion, targetRegion), arrowSize / 2, overlayRegion.width - arrowSize / 2);
  var top = (0, _clamp2.default)(getTopPosition(overlayRegion, targetRegion), arrowSize / 2, overlayRegion.height - arrowSize / 2);

  if (isTopPosition(position)) {
    arrowPosition = {
      position: {
        left: left,
        top: '100%' //'calc(100% - 1px)'
      },
      location: 'top'
    };
  }

  if (isBottomPosition(position)) {
    arrowPosition = {
      position: {
        left: left,
        bottom: '100%' //'calc(100% - 1px)'
      },
      location: 'bottom'
    };
  }

  if (isRightPosition(position)) {
    arrowPosition = {
      position: {
        top: top,
        right: '100%' //'calc(100% - 1px)'
      },
      location: 'right'
    };
  }

  if (isLeftPosition(position)) {
    arrowPosition = {
      position: {
        top: top,
        left: '100%' //'calc(100% - 1px)'
      },
      location: 'left'
    };
  }

  return arrowPosition;
}

exports.default = getArrowPosition;