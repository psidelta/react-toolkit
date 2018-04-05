/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TreeView from '../TreeView';
import { mount } from 'enzyme';
import Node from '../Node';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

const NESTED_DATA_STRUCTURE = [
  {
    label: 'test 1'
  },
  {
    label: 'test 2',
    nodes: [
      {
        label: 'test 3'
      },
      {
        label: 'test 4'
      },
      {
        label: 'test 5'
      }
    ]
  }
];

describe('disabled prop', () => {
  it('gets applied to the correct nodes', () => {
    const wrapper = mount(
      <TreeView
        dataSource={NESTED_DATA_STRUCTURE}
        disabled={{ '0': true, '1/0': true }}
      />
    );

    expect(
      wrapper
        .find(Node)
        .first()
        .props().disabled
    ).toBe(true);
    expect(
      wrapper
        .find(Node)
        .at(1)
        .props().disabled
    ).toBe(false);
    expect(
      wrapper
        .find(Node)
        .at(2)
        .props().disabled
    ).toBe(true);
  });
});

describe('isNodeDisabled', () => {
  it('gets called', () => {
    const isNodeDisabled = jest.fn();
    const wrapper = mount(
      <TreeView
        dataSource={NESTED_DATA_STRUCTURE}
        disabled={{ '0': true, '1/0': true }}
        isNodeDisabled={isNodeDisabled}
      />
    );

    expect(isNodeDisabled).toHaveBeenCalled();
  });

  it('sets disabled to correct nodes', () => {
    const isNodeDisabled = ({ index }) => {
      return index === 0;
    };

    const wrapper = mount(
      <TreeView
        dataSource={NESTED_DATA_STRUCTURE}
        disabled={{ '0': true, '1/0': true }}
        isNodeDisabled={isNodeDisabled}
      />
    );

    expect(
      wrapper
        .find(Node)
        .first()
        .props().disabled
    ).toBe(true);

    expect(
      wrapper
        .find(Node)
        .at(1)
        .props().disabled
    ).toEqual(false);
    expect(
      wrapper
        .find(Node)
        .at(2)
        .props().disabled
    ).toBe(true);
    expect(
      wrapper
        .find(Node)
        .at(3)
        .props().disabled
    ).toBe(false);
  });

  describe('node.disabled', () => {
    it('should be disabled if the node has a property disabled prop true', () => {
      const wrapper = mount(
        <TreeView dataSource={[{ label: 'test', disabled: true }]} />
      );

      expect(
        wrapper
          .find(Node)
          .first()
          .props().disabled
      ).toBe(true);
    });
  });
});
