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
import getRegion from './getRegion';
import adjustRegionOffset from './adjustRegionOffset';
import normalizeOffset from './normalizeOffset';
import getPositions from './getPositions';
import adjustPositionsToOffsetParent from './adjustPositionsToOffsetParent';

const addPositions = (
  {
    region,
    notifications,
    stacking,
    regionOffset,
    rootNode,
    board,
    stackingWrap,
    relativeToViewport
  }
) => {
  region = getRegion(region, rootNode);

  region = adjustRegionOffset({
    region,
    offset: regionOffset
  });

  const boxes = notifications.map(({ width, height, offset, closed }) => {
    return {
      closed, // means that is must be igonred
      width,
      height,
      offset: normalizeOffset(offset)
    };
  });

  let positions = getPositions({
    stacking,
    region,
    boxes,
    stackingWrap,
    relativeToViewport
  });
  /**
   * If it uses absolute positon position must be corrected.
   * Substract top and left from offsetParent (first parent that has position).
   */
  if (!relativeToViewport && rootNode && rootNode.offsetParent) {
    positions = adjustPositionsToOffsetParent({
      rootNode,
      positions,
      offsetParent: rootNode.offsetParent
    });
  }

  const positionedNotifications = notifications.map((config, index) => {
    return {
      ...config,
      position: positions[index]
    };
  });

  return positionedNotifications;
};

export default addPositions;
