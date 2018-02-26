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
 * Handles click on document, it checks if the click
 * comes from outside the target.
 *
 * Checks if the event.target is not a child and is not the
 * active target
 *@param {function} getRootNode => DOMNode
 * @param  {function} onHide
 * @return {function} unregister
 */
function registerHideOnClickOutsideEventListener(_ref) {
  var getRootNode = _ref.getRootNode,
      onHide = _ref.onHide;

  var eventHandler = function eventHandler(event) {
    var node = event.target;
    var rootNode = getRootNode();
    if (!rootNode) {
      return;
    }

    // target node should still be in the tree
    if (!global.document.body.contains(node)) {
      return;
    }

    if (rootNode !== node && !rootNode.contains(node)) {
      onHide(event, { target: null });
    }
  };

  // register
  global.document.addEventListener('click', eventHandler);

  var unregister = function unregister() {
    global.document.addEventListener('click', eventHandler);
  };

  return unregister;
}

exports.default = registerHideOnClickOutsideEventListener;