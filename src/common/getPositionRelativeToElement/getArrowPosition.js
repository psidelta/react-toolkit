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

import getArrowPositionDirection from './getArrowPositionDirection';
import clamp from '../clamp';

function getLeftPosition(overlayRegion, targetRegion) {
  return targetRegion.left - overlayRegion.left + targetRegion.width / 2;
}

function getTopPosition(overlayRegion, targetRegion) {
  return targetRegion.top - overlayRegion.top + targetRegion.height / 2;
}

function getArrowPosition({
  overlayRegion,
  targetRegion,
  position,
  arrowSize
}) {
  let arrowPosition = null;
  const positionDirection = getArrowPositionDirection(position);

  const left = clamp(
    getLeftPosition(overlayRegion, targetRegion),
    arrowSize / 2,
    overlayRegion.width - arrowSize / 2
  );
  const top = clamp(
    getTopPosition(overlayRegion, targetRegion),
    arrowSize / 2,
    overlayRegion.height - arrowSize / 2
  );

  arrowPosition = {
    top: {
      position: {
        left,
        top: 'calc(100% - 1px)'
      },
      location: 'top'
    },
    bottom: {
      position: {
        left,
        bottom: 'calc(100% - 1px)'
      },
      location: 'bottom'
    },
    right: {
      position: {
        top,
        right: 'calc(100% - 1px)'
      },
      location: 'right'
    },
    left: {
      position: {
        top,
        left: 'calc(100% - 1px)'
      },
      location: 'left'
    }
  }[positionDirection];

  return arrowPosition;
}

export default getArrowPosition;
