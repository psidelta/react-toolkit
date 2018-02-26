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
 * Gets new multiple value when an item
 * has been clicked.
 * @param  {String|number} id    Id of the item
 * @param  {Array|null} value previous value
 * @return {Array|null}       newValue
 */
function getNewMultipleValue({ id, value }) {
  let newValue

  const isArray = Array.isArray(value)
  const hasValue = isArray && value.indexOf(id) !== -1
  if (hasValue) {
    newValue = value.filter(itemId => itemId !== id)
    newValue = newValue.length ? newValue : null
  } else {
    // can be null
    newValue = isArray ? [...value, id] : [id]
  }

  return newValue
}

export default getNewMultipleValue
