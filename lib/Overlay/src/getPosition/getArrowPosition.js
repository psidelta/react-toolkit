'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clamp = require('../../../common/clamp');

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var topPositions = ['top', 'bc-tc', 'bl-tl', 'br-tr']; /**
                                                        * Copyright 2015-present Zippy Technologies
                                                        *
                                                        * Licensed under the Apache License, Version 2.0 (the "License");
                                                        * you may not use this file except in compliance with the License.
                                                        * You may obtain a copy of the License at
                                                        *   http://www.apache.org/licenses/LICENSE-2.0
                                                        * Unless required by applicable law or agreed to in writing, software
                                                        * distributed under the License is distributed on an "AS IS" BASIS,
                                                        * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                        * See the License for the specific language governing permissions and
                                                        * limitations under the License.
                                                        */

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