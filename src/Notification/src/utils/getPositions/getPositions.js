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
 * Adjusts the sizes of the boxes taking into account their offset.
 * @param {[type]} boxes [description]
 */
import getPositionsRelativeToBottomRight
  from './getPositionsRelativeToBottomRight';
import translatePositions from './translatePositions';
import getStackingDirection from './getStackingDirection';
import getPositionsRelativeToRegion from './getPositionsRelativeToRegion';
import correctBoxesSizeWithOffset from './correctBoxesSizeWithOffset';
import adjustPositionWithOffset from './adjustPositionWithOffset';
import translateCenterPosition from './translateCenterPosition';

function getPositions(
  {
    boxes = [],
    region,
    stacking = [],
    stackingWrap,
    relativeToViewport
  }
) {
  let newStacking = stacking;

  // stacking is required
  if (!stacking || stacking.length === 0) {
    return null;
  }

  let positions;

  /**
   * For center positions, a correction has to be made
   */

  if (stacking.indexOf('center') !== -1) {
    newStacking = translateCenterPosition(stacking);
    stackingWrap = false;
  }

  const stackingDirection = getStackingDirection(stacking);
  const isVertical = stackingDirection[0] === 'vertical';

  // increase size of box if it has offset
  boxes = correctBoxesSizeWithOffset(boxes);

  // debugger;
  positions = getPositionsRelativeToBottomRight({
    boxes,
    stackingWrap,
    width: region.width,
    height: region.height,
    isVertical
  });

  positions = translatePositions({
    positions,
    stacking: newStacking.length === 2 ? newStacking.join('-') : newStacking
  });

  // correct position according to offset
  positions = adjustPositionWithOffset(positions);

  // if (!relativeToViewport) {
  positions = getPositionsRelativeToRegion({
    region,
    positions
  });
  // }

  /**
   * If is center remove
   */
  if (stacking.indexOf('center') !== -1) {
    positions = positions.map(position => {
      const newPosition = { ...position };
      if (isVertical) {
        delete newPosition.left;
        delete newPosition.right;
      } else {
        delete newPosition.top;
        delete newPosition.bottom;
      }
      return newPosition;
    });
  }

  return positions;
}

export default getPositions;
