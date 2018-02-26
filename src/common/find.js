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
 * Returns the first from collection that matches the
 * test
 * @param  {Array} collection [description]
 * @param  {Function} test       [description]
 * @return {[type]}            [description]
 */
function find(collection, test) {
  if (!Array.isArray(collection)) {
    return null
  }

  if (collection.length === 0) {
    return null
  }

  if (Array.prototype.find) {
    return collection.find(test)
  }

  // this like of code must be after array and function check
  if (typeof test !== 'function') {
    return null
  }

  let needle
  for (let i = 0, len = collection.length; i < len; i++) {
    const item = collection[i]
    if (test(item)) {
      needle = item
      break
    }
  }

  return needle
}

export default find
