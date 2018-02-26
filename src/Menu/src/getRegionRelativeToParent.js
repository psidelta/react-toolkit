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

import Region from '@zippytech/region-align'
import selectParent from '../../common/selectParent'

function getRegionRelativeToParent(child, prentClassName) {
  const parent = selectParent(`.${prentClassName}`, child)
  const menuRegion = Region.from(parent)
  const thisRegion = Region.from(child)
  return {
    left: thisRegion.left - menuRegion.left,
    top: thisRegion.top - menuRegion.top,
    width: thisRegion.width,
    height: thisRegion.height
  }
}

export default getRegionRelativeToParent
