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
 * Returns the name that multiple items share.
 * @param  {Object[]} items
 * @param  {String} nameProperty
 * @return {String|Null}
 */
function getSingleSelectNames({ items, nameProperty }) {
  if (!items || items.length <= 1) {
    return null
  }

  let names = items.reduce((acc, item) => {
    const name = item[nameProperty]
    if (acc[name] !== undefined) {
      acc[name] = true
    } else {
      acc[name] = false
    }

    return acc
  }, {})

  return names
}

export default getSingleSelectNames
