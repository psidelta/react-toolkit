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
import Region from '@zippytech/region';

function getRegion(region, node) {
  let constrainRegion;

  if (typeof region === 'function') {
    region = region(node);
  }

  if (typeof region === 'object') {
    constrainRegion = Region.from(region);
  }

  if (region === true && global.document) {
    const viewportWidth = Math.max(
      document.documentElement.clientWidth,
      global.innerWidth || 0
    );
    const viewportHeight = Math.max(
      document.documentElement.clientHeight,
      global.innerHeight || 0
    );
    constrainRegion = Region.from({
      top: 0,
      left: 0,
      width: viewportWidth,
      height: viewportHeight
    });
  }

  if (!constrainRegion && typeof region === 'string' && global.document) {
    region = document.querySelector(region);
  }

  if (!constrainRegion) {
    constrainRegion = Region.from(region);
  }

  return constrainRegion;
}

export default getRegion;
