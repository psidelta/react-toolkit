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

/**
 * Translates:
 * top-center => bottom-right
 * left-center => right-bottom
 * right-center => left-bottom
 * bottom-center => top-right
 */
function translateCenterPosition(stacking) {
  const [firstDirection] = stacking;
  let newStacking;

  switch (firstDirection) {
    case 'top':
      newStacking = ['bottom', 'right'];
      break;
    case 'left':
      newStacking = ['right', 'top'];
      break;
    case 'right':
      newStacking = ['left', 'bottom'];
      break;
    case 'bottom':
      newStacking = ['top', 'right'];
      break;
  }

  return newStacking;
}

export default translateCenterPosition;
