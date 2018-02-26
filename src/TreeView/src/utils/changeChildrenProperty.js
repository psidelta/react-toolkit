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

import assign from '../../../common/assign';

/**
 * Returns a map with all it children
 * checked or uncheded, depending on
 * check value
 * @param {Object} nodeProps - nodeProps
 * @param {Bool} checked
 * @return {Object} checkMap
 */
function changeChildrenProperty(nodeProps, newState) {
  let propertyMap = { [nodeProps.path]: newState };
  if (nodeProps.children) {
    const children = nodeProps.children.map(child => changeChildrenProperty(child.props, newState));

    children.forEach(child => {
      assign(propertyMap, child);
    });
  }

  return propertyMap;
}

export default changeChildrenProperty;
