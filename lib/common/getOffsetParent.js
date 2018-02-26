'use strict';

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
 * If fixed the offset parent is null, so
 * must find first parent with position set.
 */
function getOffsetParent(node) {
  var parent = node && node.parentNode;

  // fist check if first parent has position,
  // if not get offsetparent
  var computedStyle = global.getComputedStyle(parent);
  if (computedStyle.position !== 'static') {
    return parent;
  }

  return parent && parent.offsetParent;
}

exports.default = getOffsetParent;