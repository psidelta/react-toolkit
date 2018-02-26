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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adjustPositionsToOffsetParent = function adjustPositionsToOffsetParent(_ref) {
  var positions = _ref.positions,
      offsetParent = _ref.offsetParent,
      rootNode = _ref.rootNode;

  var offsetParentRegion = (0, _getRegion2.default)(offsetParent, rootNode);
  var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  positions = positions.map(function (position) {
    var newPosition = _extends({}, position);

    if (position.bottom !== undefined) {
      newPosition.bottom -= viewportHeight - offsetParentRegion.bottom;
    }

    if (position.top !== undefined) {
      newPosition.top -= offsetParentRegion.top;
    }

    if (position.left !== undefined) {
      newPosition.left -= offsetParentRegion.left;
    }

    if (position.right !== undefined) {
      newPosition.right -= viewportWidth - offsetParentRegion.right;
    }

    return newPosition;
  });

  return positions;
};

exports.default = adjustPositionsToOffsetParent;