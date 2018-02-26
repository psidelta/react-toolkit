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

import clamp from '../../../common/clamp';

const topPositions = ['top', 'bc-tc', 'bl-tl', 'br-tr'];
const bottomPositions = ['bottom', 'tc-bc', 'tl-bl', 'tr-br'];
const rightPositions = ['right', 'lc-rc', 'tl-tr', 'bl-br'];
const leftPositions = ['left', 'rc-lc', 'tr-tl', 'br-bl'];
const noArrowPositions = ['br-tl', 'tl-br', 'tr-bl'];

function isTopPosition(position) {
  return topPositions.indexOf(position) !== -1;
}

function isBottomPosition(position) {
  return bottomPositions.indexOf(position) !== -1;
}

function isLeftPosition(position) {
  return leftPositions.indexOf(position) !== -1;
}

function isRightPosition(position) {
  return rightPositions.indexOf(position) !== -1;
}

function getLeftPosition(overlayRegion, targetRegion) {
  return targetRegion.left - overlayRegion.left + targetRegion.width / 2;
}

function getTopPosition(overlayRegion, targetRegion) {
  return targetRegion.top - overlayRegion.top + targetRegion.height / 2;
}

function getArrowPosition({ overlayRegion, targetRegion, position, arrowSize }) {
  let arrowPosition = null;

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

  if (isTopPosition(position)) {
    arrowPosition = {
      position: {
        left,
        top: '100%' //'calc(100% - 1px)'
      },
      location: 'top'
    };
  }

  if (isBottomPosition(position)) {
    arrowPosition = {
      position: {
        left,
        bottom: '100%' //'calc(100% - 1px)'
      },
      location: 'bottom'
    };
  }

  if (isRightPosition(position)) {
    arrowPosition = {
      position: {
        top,
        right: '100%' //'calc(100% - 1px)'
      },
      location: 'right'
    };
  }

  if (isLeftPosition(position)) {
    arrowPosition = {
      position: {
        top,
        left: '100%' //'calc(100% - 1px)'
      },
      location: 'left'
    };
  }

  return arrowPosition;
}

export default getArrowPosition;
