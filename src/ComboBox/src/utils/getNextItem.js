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

import findItemIndex from './findItemIndex';

/**
 * Returns the next items id in the list
 * @param  {Function} getIdProperty [description]
 * @param  {Array} data
 * @param  {String|Number} id - current item id
 * @return {String|Number}
 */
function getNextItem(config) {
  const { data, id, getIdProperty, direction = 1 } = config;
  if (!Array.isArray(data) || !data.length || !getIdProperty || id == null) {
    return null;
  }

  if (data.length === 1) {
    return id;
  }

  /**
   * check if any items are valid targets,
   * if all are disabled return null
  **/
  const enabledItems = data.filter(item => !item.disabled);
  if (enabledItems.length === 0) {
    return null;
  }

  const currentIndex = findItemIndex({ data, id, getIdProperty });

  let nextIndex;
  if (direction === 1) {
    nextIndex = currentIndex + 1;
    nextIndex = nextIndex > data.length - 1 ? 0 : nextIndex;
  } else {
    nextIndex = currentIndex - 1;
    nextIndex = nextIndex >= 0 ? nextIndex : data.length - 1;
  }

  const newItem = data[nextIndex];
  let newActiveId = getIdProperty(newItem);

  if (newItem.disabled) {
    newActiveId = getNextItem({
      ...config,
      id: newActiveId
    });
  }

  return newActiveId;
}

export default getNextItem;
