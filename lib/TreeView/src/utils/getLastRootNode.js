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
 * Finds a previous sibling that is a root node (parent === null)
 * @param {Number} activeIndex
 * @param {Array} visibleNodes
 * @return {Object} previousRootNode
 */
function getPreviousRootNode(activeIndex, visibleNodes) {
  var result = null;
  var index = visibleNodes.length - 1;

  while (index > activeIndex) {
    if (visibleNodes[index].parent === null) {
      result = visibleNodes[index];
      break;
    }
    index -= 1;
  }

  return result;
}

exports.default = getPreviousRootNode;