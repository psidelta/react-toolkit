'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getArrowPositionDirection = require('./getArrowPositionDirection');

var _getArrowPositionDirection2 = _interopRequireDefault(_getArrowPositionDirection);

var _clamp = require('../clamp');

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
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
  var positionDirection = (0, _getArrowPositionDirection2.default)(position);

  var left = (0, _clamp2.default)(getLeftPosition(overlayRegion, targetRegion), arrowSize / 2, overlayRegion.width - arrowSize / 2);
  var top = (0, _clamp2.default)(getTopPosition(overlayRegion, targetRegion), arrowSize / 2, overlayRegion.height - arrowSize / 2);

  arrowPosition = {
    top: {
      position: {
        left: left,
        top: 'calc(100% - 1px)'
      },
      location: 'top'
    },
    bottom: {
      position: {
        left: left,
        bottom: 'calc(100% - 1px)'
      },
      location: 'bottom'
    },
    right: {
      position: {
        top: top,
        right: 'calc(100% - 1px)'
      },
      location: 'right'
    },
    left: {
      position: {
        top: top,
        left: 'calc(100% - 1px)'
      },
      location: 'left'
    }
  }[positionDirection];

  return arrowPosition;
}

exports.default = getArrowPosition;