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

import Region from '@zippytech/region-align';
import assign from '../assign';
import getPositionOffsets from './getPositionOffsets';
import positionsMap from './positionsMap';
import getArrowPosition from './getArrowPosition';
import getConstrainRegion from './getConstrainRegion';
import isPositionBottom from './isPositionBottom';

const posiblePositions = Object.keys(positionsMap);

// position
function getPosition({
  constrainTo = true,
  targetNode,
  overlayNode,
  offset = 0,
  positions = posiblePositions,
  relativeToViewport = true,
  arrowSize = 10,
  adjustOnPositionBottom = true,
  showArrow = true
}) {
  if (!constrainTo || !overlayNode || !targetNode) {
    return null;
  }

  const constrain = getConstrainRegion(constrainTo, targetNode);

  const overlayRegion = Region.from(overlayNode);
  const alignRegion = Region.from(targetNode);

  const newRegion = overlayRegion.clone();
  const positionsNormalized = positions.map(position => {
    let normalizedPosition;

    if (positionsMap[position]) {
      normalizedPosition = positionsMap[position].position;
    } else {
      normalizedPosition = position.position || position;
    }

    return normalizedPosition;
  });

  const positionsOffsets = getPositionOffsets(positions, offset);
  const positionsOffsetsClone = positionsOffsets.map(offset => {
    return assign({}, offset);
  });

  const succesfullPosition = newRegion.alignTo(
    alignRegion,
    positionsNormalized,
    {
      constrain,
      offset: positionsOffsetsClone
    }
  );

  const constrainedWidth = newRegion.getWidth() != overlayRegion.getWidth();
  const constrainedHeight = newRegion.getHeight() != overlayRegion.getHeight();

  let arrowConfig = null;
  if (showArrow) {
    arrowConfig = getArrowPosition({
      arrowSize,
      overlayRegion: newRegion,
      targetRegion: alignRegion,
      position: succesfullPosition
    });
  }

  const position = {
    top: newRegion.top,
    left: newRegion.left
  };

  /**
   * If it uses absolute positon position must be corrected.
   * Substract top and left from offsetParent (first parent that has position).
   */
  if (!relativeToViewport && overlayNode.offsetParent) {
    const offsetParentRegion = Region.from(overlayNode.offsetParent);
    position.left -= offsetParentRegion.left;
    position.top -= offsetParentRegion.top;
  }

  /**
   * If position is bottom, the overlay
   * should be positioned relative to bottom.
   */
  if (isPositionBottom(succesfullPosition) && adjustOnPositionBottom) {
    position.bottom = -(
      overlayRegion.height +
      (alignRegion.height - position.top)
    );
    delete position.top;
  }

  return {
    alignRegion,
    constrainedHeight,
    constrainedWidth,
    constrained: constrainedHeight || constrainedWidth,
    positionRegion: newRegion,
    arrowConfig,
    position,
    succesfullPosition
  };
}

export default getPosition;
