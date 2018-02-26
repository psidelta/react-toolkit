"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

/**
 * Takes in account the position of the region
 * and corrects the positions to be relative to it.
    (referenceRegion.height - region.bottom) = css relative bottom
    bacuse region.bottom is the distance from top to bottom
*/
function getPositionsRelativeToRegion(_ref) {
  var region = _ref.region,
      positions = _ref.positions;

  return positions.map(function (position) {
    var newPosition = {};

    var viewportWidth = Math.max(0,
    // document.documentElement.clientWidth,
    window.innerWidth || 0);
    var viewportHeight = Math.max(0,
    // document.documentElement.clientHeight,
    window.innerHeight || 0);
    // debugger;

    if (position.bottom !== undefined) {
      newPosition.bottom = position.bottom + (viewportHeight - region.bottom);
    }

    if (position.top !== undefined) {
      newPosition.top = position.top + region.top;
    }

    if (position.left !== undefined) {
      newPosition.left = position.left + region.left;
    }

    if (position.right !== undefined) {
      newPosition.right = position.right + (viewportWidth - region.right);
    }

    return newPosition;
  });
}

exports.default = getPositionsRelativeToRegion;