/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getNewRecursiveCheckedState from '../getNewRecursiveCheckedState';
import assign from 'object-assign';

const data = [
  {
    label: 'Home',
    path: '0',
    nodes: [
      {
        label: 'Note',
        path: '0/0'
      },
      {
        label: 'Table',
        path: '0/1'
      },
      {
        label: 'Window',
        path: '0/2',
        nodes: [
          {
            label: 'Sky',
            path: '0/2/0'
          }
        ]
      }
    ]
  }
];

/**
 * Simulate tree structure
 * that results from rendering
 * nodes
 */
function prepareData(data, parent = null) {
  return data.map((node, index) => prepareNode(node, index, parent));
}

function prepareNode(node, index, parent) {
  let newNode = {
    index,
    parent,
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

describe('getNewRecursiveCheckedState', () => {
  let preparedData;
  let initialCheckState;
  beforeEach(() => {
    // anotate data
    preparedData = prepareData(data);
    initialCheckState = {};
  });

  it('shoud propagate down checked to all children', () => {
    const test = {
      '0': true,
      '0/0': true,
      '0/1': true,
      '0/2': true,
      '0/2/0': true
    };

    expect(
      getNewRecursiveCheckedState({
        currentState: initialCheckState,
        checked: true,
        nodeProps: preparedData[0].props
      })
    ).toEqual(test);
  });

  it('shoud propagate down checked = false to all children', () => {
    const test = {
      '0': false,
      '0/0': false,
      '0/1': false,
      '0/2': false,
      '0/2/0': false
    };

    const expected = getNewRecursiveCheckedState({
      currentState: initialCheckState,
      checked: false,
      nodeProps: preparedData[0].props
    });

    expect(expected).toEqual(test);
  });

  it('should propagate to parents', () => {
    const test = {
      '0': null,
      '0/2': true,
      '0/2/0': true
    };
    const expected = getNewRecursiveCheckedState({
      currentState: initialCheckState,
      checked: true,
      nodeProps: preparedData[0].props.children[2].props.children[0].props
    });

    expect(expected).toEqual(test);
  });
});
