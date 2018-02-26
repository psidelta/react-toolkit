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
 * Determines the general direction of the stacking.
 *
 * @param  {array} stacking stacking
 * @return {array} general direction stacking
 */
function getStackingDirection(stacking) {
  let stackingDirection;
  if (stacking.length === 1) {
    stackingDirection =
      stacking[0] === 'top' || stacking[0] === 'bottom'
        ? ['vertical']
        : ['horizontal'];
  } else {
    stackingDirection =
      stacking[0] === 'top' || stacking[0] === 'bottom'
        ? ['vertical', 'horizontal']
        : ['horizontal', 'vertical'];
  }
  return stackingDirection;
}

export default getStackingDirection;
