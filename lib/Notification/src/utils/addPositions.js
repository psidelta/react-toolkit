'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
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


var _getRegion = require('./getRegion');

var _getRegion2 = _interopRequireDefault(_getRegion);

var _adjustRegionOffset = require('./adjustRegionOffset');

var _adjustRegionOffset2 = _interopRequireDefault(_adjustRegionOffset);

var _normalizeOffset = require('./normalizeOffset');

var _normalizeOffset2 = _interopRequireDefault(_normalizeOffset);

var _getPositions = require('./getPositions');

var _getPositions2 = _interopRequireDefault(_getPositions);

var _adjustPositionsToOffsetParent = require('./adjustPositionsToOffsetParent');

var _adjustPositionsToOffsetParent2 = _interopRequireDefault(_adjustPositionsToOffsetParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addPositions = function addPositions(_ref) {
  var region = _ref.region,
      notifications = _ref.notifications,
      stacking = _ref.stacking,
      regionOffset = _ref.regionOffset,
      rootNode = _ref.rootNode,
      board = _ref.board,
      stackingWrap = _ref.stackingWrap,
      relativeToViewport = _ref.relativeToViewport;

  region = (0, _getRegion2.default)(region, rootNode);

  region = (0, _adjustRegionOffset2.default)({
    region: region,
    offset: regionOffset
  });

  var boxes = notifications.map(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height,
        offset = _ref2.offset,
        closed = _ref2.closed;

    return {
      closed: closed, // means that is must be igonred
      width: width,
      height: height,
      offset: (0, _normalizeOffset2.default)(offset)
    };
  });

  var positions = (0, _getPositions2.default)({
    stacking: stacking,
    region: region,
    boxes: boxes,
    stackingWrap: stackingWrap,
    relativeToViewport: relativeToViewport
  });
  /**
   * If it uses absolute positon position must be corrected.
   * Substract top and left from offsetParent (first parent that has position).
   */
  if (!relativeToViewport && rootNode && rootNode.offsetParent) {
    positions = (0, _adjustPositionsToOffsetParent2.default)({
      rootNode: rootNode,
      positions: positions,
      offsetParent: rootNode.offsetParent
    });
  }

  var positionedNotifications = notifications.map(function (config, index) {
    return _extends({}, config, {
      position: positions[index]
    });
  });

  return positionedNotifications;
};

exports.default = addPositions;