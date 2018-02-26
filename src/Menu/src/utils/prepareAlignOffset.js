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

import range from '../../../common/range';

function prepareAlignOffset(alignOffset, positionsLength) {
  // if number normalize to { x, y }
  let offset;
  if (Array.isArray(alignOffset)) {
    offset = alignOffset.map(alignOffsetItem => {
      // make sure it is in object
      if (typeof alignOffsetItem === 'number') {
        return {
          x: alignOffsetItem,
          y: alignOffsetItem
        };
      } else {
        return alignOffsetItem;
      }
    });
  }

  if (typeof alignOffset === 'number') {
    offset = {
      x: alignOffset,
      y: alignOffset
    };
  }

  if (typeof alignOffset === 'object') {
    offset = alignOffset;
  }

  // have to be the same number of offsets as positions
  if (!Array.isArray(offset) && positionsLength) {
    offset = range(0, positionsLength).map(() => offset);
  }

  return offset;
}

export default prepareAlignOffset;
