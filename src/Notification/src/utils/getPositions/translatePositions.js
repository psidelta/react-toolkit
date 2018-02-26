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
  getPositions returns positions considering only these two systems:

   +------------->   +------------>
   |                 |      d
   |                 |
   | d               |
   |                 |
   |                 |
   v                 v

  bottom - right and right - bottom


  From this sistem we can calculate the next ones.


  +-------------------------+
  | Stacking:               |   ^                  ^
  | top-right and right-top |   |d                 |
  |                         |   |                  |
  | left` = left            |   |                  |
  | bottom` = top           |   |                  |
  +-------------------------+   +-------------->   +--------------->
                                                        d
  +-------------------------+    <-----------+       <-----------+
  | Stacking:               |          d     |                   |
  | left-bottom and bottom-left |            |                   |
  |                         |                |                 d |
  | top` = top              |                |                   |
  | right` = left           |                |                   v
  +---------------+---------+                v

  +-------------------------+
  | Stacking:               |              ^                    ^
  | left-top and top-left   |              |                    |
  |                         |              |                 d  |
  | bottom` = top           |              |                    |
  | right` = left           |        d     |                    |
  +----------------+--------+   <----------+        <-----------+

  d = dominant
  first direction of stacking is dominant. First it stacks
  in that direction until it fits and it stacks in the next direction.
 */

function handleTopRight({ top, left, offset }) {
  return {
    offset,
    left,
    bottom: top
  };
}

function handleDownLeft({ top, left, offset }) {
  return {
    offset,
    top,
    right: left
  };
}

function handleTopLeft({ left, top, offset }) {
  return {
    offset,
    bottom: top,
    right: left
  };
}

const topRightPositions = {
  'top-right': true,
  'right-top': true,
  top: true // has same formula
};

const downLeftPositions = {
  'left-bottom': true,
  'bottom-left': true,
  left: true // has same formula
};

const topLeftPositions = {
  'top-left': true,
  'left-top': true
};

function translatePositions(
  {
    positions,
    stacking
  }
) {
  let newPositions = positions;
  if (topRightPositions[stacking]) {
    newPositions = positions.map(handleTopRight);
  }

  if (downLeftPositions[stacking]) {
    newPositions = positions.map(handleDownLeft);
  }

  if (topLeftPositions[stacking]) {
    newPositions = positions.map(handleTopLeft);
  }

  return newPositions;
}

export default translatePositions;
