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

function getArrowPositionDirection(position) {
  const positionTest = {
    top: isTopPosition(position),
    bottom: isBottomPosition(position),
    right: isRightPosition(position),
    left: isLeftPosition(position)
  };

  return Object.keys(positionTest).filter(
    position => !!positionTest[position]
  )[0];
}

export default getArrowPositionDirection;
