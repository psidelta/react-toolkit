"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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