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

function sum(a, b) {
  return a + b;
}

/**
 * Returns an object with the keys:
 * getGroupedItems([30], [30], [40], dropdownButtonSize)
 * {
 *   visibleIndexes: Number[], - a list of indexes that are visible
 *   overflowItem: Number[], - a list of indexes that don't fit
 * }
 * @param  {Number[]} boxes              a list of box sizes to fit into maxSize
 * @param  {Number} overflowControlSize the size of the overflow control
 * @return {{
 *   visibleIndexes: [],
 *   overflowIndexes: [],
 * }}|null - an object with visible and overflow indexes, or null if it doesn't oveflow
 */
function getGroupedItems(_ref) {
  var boxes = _ref.boxes,
      maxSize = _ref.maxSize,
      _ref$overflowControlS = _ref.overflowControlSize,
      overflowControlSize = _ref$overflowControlS === undefined ? 0 : _ref$overflowControlS;

  // check if they fit
  var boxesSize = boxes.reduce(sum);
  if (boxesSize <= maxSize) {
    return false;
  }

  var availableSize = maxSize - overflowControlSize;

  var groups = boxes.reduce(function (acc, box, index) {
    if (availableSize - box >= 0) {
      // then it fits
      acc.visibleIndexes.push(index);
      availableSize -= box;
    } else {
      availableSize = 0;
      acc.overflowIndexes.push(index);
    }

    return acc;
  }, { visibleIndexes: [], overflowIndexes: [] });

  return groups;
}

exports.default = getGroupedItems;