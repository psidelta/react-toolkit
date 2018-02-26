'use strict';

var _getNewRecursiveCheckedState = require('../getNewRecursiveCheckedState');

var _getNewRecursiveCheckedState2 = _interopRequireDefault(_getNewRecursiveCheckedState);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var data = [{
  label: 'Home',
  path: '0',
  nodes: [{
    label: 'Note',
    path: '0/0'
  }, {
    label: 'Table',
    path: '0/1'
  }, {
    label: 'Window',
    path: '0/2',
    nodes: [{
      label: 'Sky',
      path: '0/2/0'
    }]
  }]
}];

/**
 * Simulate tree structure
 * that results from rendering
 * nodes
 */
function prepareData(data) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return data.map(function (node, index) {
    return prepareNode(node, index, parent);
  });
}

function prepareNode(node, index, parent) {
  var newNode = {
    index: index,
    parent: parent,
    hasChildren: !!node.nodes,
    path: node.path
  };

  if (node.nodes) {
    newNode.children = prepareData(node.nodes, newNode);
  }

  return {
    props: newNode
  };
}

describe('getNewRecursiveCheckedState', function () {
  var preparedData = void 0;
  var initialCheckState = void 0;
  beforeEach(function () {
    // anotate data
    preparedData = prepareData(data);
    initialCheckState = {};
  });

  it('shoud propagate down checked to all children', function () {
    var test = {
      '0': true,
      '0/0': true,
      '0/1': true,
      '0/2': true,
      '0/2/0': true
    };

    expect((0, _getNewRecursiveCheckedState2.default)({
      currentState: initialCheckState,
      checked: true,
      nodeProps: preparedData[0].props
    })).to.deep.equal(test);
  });

  it('shoud propagate down checked = false to all children', function () {
    var test = {
      '0': false,
      '0/0': false,
      '0/1': false,
      '0/2': false,
      '0/2/0': false
    };

    var expected = (0, _getNewRecursiveCheckedState2.default)({
      currentState: initialCheckState,
      checked: false,
      nodeProps: preparedData[0].props
    });

    expect(expected).to.deep.equal(test);
  });

  it('should propagate to parents', function () {
    var test = {
      '0': null,
      '0/2': true,
      '0/2/0': true
    };
    var expected = (0, _getNewRecursiveCheckedState2.default)({
      currentState: initialCheckState,
      checked: true,
      nodeProps: preparedData[0].props.children[2].props.children[0].props
    });

    expect(expected).to.deep.equal(test);
  });
});