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
 * active target or the overlay
 *
 * @param  {String} target
 * @param  {function} onHide
 * @return {Void}
 */
function createHideOnClickOutsideAction({ getOverlayNode, getActiveTargetNode, onHide }) {
  return event => {
    const node = event.target;
    const activeTargetNode = getActiveTargetNode();
    const overlayNode = getOverlayNode();

    if (!activeTargetNode || !overlayNode) {
      return null;
    }

    if (
      // overlay
      overlayNode !== node &&
      !overlayNode.contains(node) &&
      // active target
      activeTargetNode !== node &&
      !activeTargetNode.contains(node)
    ) {
      onHide(event, { target: null });
    }
  };
}

export default createHideOnClickOutsideAction;
