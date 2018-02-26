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

import safeParseInt from './safeParseInt';
import assign from 'object-assign';
import injectNode from './injectNode';

/**
 * Creates a function that updates datasource.
 * updateNode should return a new node, or nutate the node passed.
 * The new node, or the mutated node is then inserted into the dataSource.
 *
 * getDataSourceUpdater :: config -> (nodeConfig -> node) -> newDataSource
 */
const getDataSourceUpdater = ({ data, nodeProps, extraProps }) =>
  updateNode => {
    const indexPath = nodeProps.indexPath.split('/').map(safeParseInt);
    let node = assign({}, nodeProps.node);

    // default to node (potentialy mutated) if updateNode returns null|undefined
    const newNode = updateNode(assign({ node, nodeProps }, extraProps)) || node;
    const newDataSource = injectNode(newNode, indexPath, data);

    return newDataSource;
  };

export default getDataSourceUpdater;
