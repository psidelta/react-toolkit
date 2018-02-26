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

import assign from 'object-assign';

/**
 * Creates a new array with a node injected
 * at the specified indexPath
 * @param {Array} nodes
 * @param {Array} indexPath
 * @param {Array} data
 * @return {Array} newData
 */
function injectNodes(nodeToInject, indexPath, data) {
  let newData;
  let currentIndex = indexPath[0];

  // last item
  if (indexPath.length === 1) {
    return data.map((node, index) => {
      if (index === currentIndex) {
        return nodeToInject;
      }

      return node;
    });
  }

  newData = data.map((node, index) => {
    if (index === currentIndex) {
      return assign({}, node, {
        nodes: injectNodes(nodeToInject, indexPath.slice(1), node.nodes)
      });
    }

    return node;
  });

  return newData;
}

export default injectNodes;
