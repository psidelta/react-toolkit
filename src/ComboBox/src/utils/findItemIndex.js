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
 * Returns the index of the given item id
 * @param  {Number|String} id
 * @param  {Array} data
 * @param  {Function} getIdProperty
 * @return {Int}
 */
function findItemIndex({ id, data, getIdProperty }) {
  if (!Array.isArray(data) || !getIdProperty || id == null) {
    return null;
  }
  const filteredList = data.reduce((acc, item, index) => {
    if (getIdProperty(item) === id) {
      acc = index;
    }

    return acc;
  }, null);

  return filteredList !== null ? filteredList : null;
}

export default findItemIndex;
