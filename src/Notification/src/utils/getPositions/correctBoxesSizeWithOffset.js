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
function correctBoxesSizeWithOffset(boxes) {
  return boxes.map(box => {
    if (box.offset) {
      const newBox = { ...box };

      if (box.offset.top) {
        newBox.height += box.offset.top;
      }
      if (box.offset.bottom) {
        newBox.height += box.offset.bottom;
      }
      if (box.offset.left) {
        newBox.width += box.offset.left;
      }
      if (box.offset.right) {
        newBox.width += box.offset.right;
      }

      return newBox;
    }

    return box;
  });
}

export default correctBoxesSizeWithOffset;
