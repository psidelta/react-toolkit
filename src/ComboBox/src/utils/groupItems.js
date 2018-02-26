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
 * Separates items into two groups.
 * Tags that can be rendered in a normal way.
 * And items that don't fit and must be rendered into one.
 * @param  {Object[]} items
 * @param  {Number} maxTagsLength
 * @return {{ remainingItems: Object[], visibleItems: Object[] }}
 */
function groupItems({ items, maxTagsLength }) {
  let visibleItems = items
  let remainingItems = null

  if (items.length > maxTagsLength) {
    const cutFrom = maxTagsLength
    remainingItems = items.slice(cutFrom)
    visibleItems = items.slice(0, cutFrom)
  }

  return {
    visibleItems,
    remainingItems
  }
}

export default groupItems
