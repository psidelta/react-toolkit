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
/**
 * Returs next item that shoud be selected.
 * If the item has something on the right it should change to that one
 * if not it should check the one on the left.
 * @param  {Stirng|Number} id
 * @param  {String[]|Number[]} value
 * @return {String|Number} newActivetag
*/
function getNewActiveTagOnRemove({ id, value, dir }) {
  dir = dir || -1;
  if (!Array.isArray(value) || value.length === 1) {
    return null;
  }
  let newActiveTag = null;
  const currentIndex = value.indexOf(id);
  const lastIndex = value.length - 1;
  let newIndex = clamp(currentIndex + dir, 0, lastIndex);
  if (dir == 1 && currentIndex === lastIndex) {
    newIndex = clamp(currentIndex - 1, 0, lastIndex);
  }

  if (dir == -1 && currentIndex == 0 && lastIndex > 0) {
    newIndex = 1;
  }

  newActiveTag = value[newIndex];

  return newActiveTag;
}

export default getNewActiveTagOnRemove;
