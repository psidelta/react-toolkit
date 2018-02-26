'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _safeParseInt = require('./safeParseInt');

var _safeParseInt2 = _interopRequireDefault(_safeParseInt);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _injectNode = require('./injectNode');

var _injectNode2 = _interopRequireDefault(_injectNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a function that updates datasource.
 * updateNode should return a new node, or nutate the node passed.
 * The new node, or the mutated node is then inserted into the dataSource.
 *
 * getDataSourceUpdater :: config -> (nodeConfig -> node) -> newDataSource
 */
var getDataSourceUpdater = function getDataSourceUpdater(_ref) {
  var data = _ref.data,
      nodeProps = _ref.nodeProps,
      extraProps = _ref.extraProps;
  return function (updateNode) {
    var indexPath = nodeProps.indexPath.split('/').map(_safeParseInt2.default);
    var node = (0, _objectAssign2.default)({}, nodeProps.node);

    // default to node (potentialy mutated) if updateNode returns null|undefined
    var newNode = updateNode((0, _objectAssign2.default)({ node: node, nodeProps: nodeProps }, extraProps)) || node;
    var newDataSource = (0, _injectNode2.default)(newNode, indexPath, data);

    return newDataSource;
  };
}; /**
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

exports.default = getDataSourceUpdater;