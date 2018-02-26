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
 * Returns next non null item.
 * Used to navigate over disabled items.
 * @param  {Object[]} items
 * @param  {Number} [startFrom=0] Index of the current item
 * @param  {Number} [direction=1] In which direction should search for the next item
 * @return {Number}               Index of the next item
 */
function getNextNavigableItem(items, startFrom = 0, direction = 1) {
  let nextNavigableItem = null
  if (!items || items && !items.length) {
    return null
  }

  if (startFrom === null) {
    return null
  }

  if (direction === 1) {
    for (let i = startFrom + 1, len = items.length; i < len; i++) {
      const item = items[i]
      const isDisabled = item && item.disabled
      const isSeparator = item === '-'
      const isTitle = item.isTitle

      if (!isSeparator && !isDisabled && !isTitle) {
        nextNavigableItem = i
        break
      }
    }
  } else {
    for (let i = startFrom - 1; i >= 0; i--) {
      const item = items[i]
      const isDisabled = item && item.disabled
      const isSeparator = item === '-'
      const isTitle = item.isTitle

      if (!isSeparator && !isDisabled && !isTitle) {
        nextNavigableItem = i
        break
      }
    }
  }

  return nextNavigableItem
}

export default getNextNavigableItem
