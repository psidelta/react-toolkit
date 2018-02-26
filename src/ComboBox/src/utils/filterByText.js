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

import hightlightText from './hightlightText';

/**
 * Checkes if label contains text
 * @param  {String} label
 * @param  {String} text
 * @return {Bool}
 */
const defaultFilterFunction = ({ label, text, mode }) => {
  label = label.toLowerCase ? label.toLowerCase() : `${label}`;
  text = text.toLowerCase ? text.toLowerCase() : `${text}`;
  return mode === 'contains'
    ? label.indexOf(text) !== -1
    : label.startsWith(text);
};

/**
 * Filters data source by text
 * @param {Array} data
 * @param {function} getDisplayProperty
 * @param {String} text
 * @return {Array} sortedData
 */
function filterByText({
  data,
  getFilterProperty,
  text,
  filterFunction = defaultFilterFunction,
  mode = 'contains',
  hightlight
}) {
  if (!Array.isArray(data)) {
    return null;
  }

  const filteredData = data.reduce((acc, item) => {
    const label = getFilterProperty(item);
    const match = filterFunction({ label, text, item, mode });

    if (match) {
      if (hightlight) {
        const newItem = {
          ...item,
          mode,
          matchText: hightlightText({
            queryText: text,
            text: label
          })
        };
        acc.push(newItem);
      } else {
        acc.push(item);
      }
    }

    return acc;
  }, []);

  return filteredData;
}

export default filterByText;
