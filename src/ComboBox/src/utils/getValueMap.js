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

const contains = (stack, needle) => {
  for (let i = 0; i < stack.length; i++) {
    if (stack[i] == needle) {
      return true;
    }
  }
  return false;
};

/**
 * Returns an object that holds the items
 * asociated with the value.
 * @param  {String|Number|String[]|Number[]} value
 * @param  {Object} dataMap
 * @return {Object}
 */

function getValueMap({ value, dataMap, oldValueMap }) {
  if (value == null) {
    return oldValueMap;
  }

  let valueMap = { ...oldValueMap };

  value = Array.isArray(value) ? value : [value];

  // clean up extra values which are not in the "value" array
  valueMap = Object.keys(valueMap).reduce((acc, id) => {
    if (contains(value, id)) {
      acc[id] = valueMap[id];
    }
    // if (value.indexOf(id) !== -1) {
    //   acc[id] = valueMap[id];
    // }
    return acc;
  }, {});

  value.forEach(id => {
    if (dataMap && dataMap[id]) {
      valueMap[id] = dataMap[id];
    }
  });

  return valueMap;
}

export default getValueMap;
