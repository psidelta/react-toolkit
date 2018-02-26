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
import normalizeOffset from './normalizeOffset';

const adjustRegionOffset = ({ region, offset }) => {
  offset = normalizeOffset(offset);

  const newRegion = region.clone();

  if (offset.top) {
    newRegion.addTop(offset.top);
  }

  if (offset.bottom) {
    newRegion.addBottom(-offset.bottom);
  }

  if (offset.left) {
    newRegion.addLeft(offset.left);
  }

  if (offset.right) {
    newRegion.addRight(-offset.right);
  }

  return newRegion;
};

export default adjustRegionOffset;
