/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TreeView from '../TreeView';
import { mount, shallow } from 'enzyme';
import Node from '../Node';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

const NESTED_DATA_STRUCTURE = [
  { label: 'test 1' },
  {
    label: 'test 2',
    nodes: [{ label: 'test 3' }, { label: 'test 4' }, { label: 'test 5' }]
  }
];

const NESTED_DATA_STRUCTURE_3_LEVELS = [
  { label: 'test 1' },
  {
    label: 'test 2',
    nodes: [
      { label: 'test 3' },
      { label: 'test 4' },
      {
        label: 'test 5',
        nodes: [{ label: 'test 6' }, { label: 'test 7' }, { label: 'test 8' }]
      }
    ]
  }
];

describe('collapseDepth props', () => {
  describe('collapseDepth', () => {
    it('should nodes have a correct depth prop', () => {
      const wrapper = mount(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);
      expect(
        wrapper
          .find(Node)
          .first()
          .props().depth
      ).toEqual(0);
      expect(
        wrapper
          .find(Node)
          .last()
          .props().depth
      ).toEqual(1);
    });

    it('has all node collapsed on collapseDepth=0', () => {
      const wrapper = mount(
        <TreeView dataSource={NESTED_DATA_STRUCTURE} collapsedDepth={0} />
      );
      expect(wrapper.find(Node)).toHaveLength(2);
    });

    it('has expanded only first two levels collapseDepth=1', () => {
      const wrapper = mount(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE_3_LEVELS}
          collapsedDepth={1}
        />
      );

      expect(wrapper.find(Node)).toHaveLength(5);
    });

    it('collapsedDepth=0, if node changes collapse state should update correct', () => {
      const wrapper = shallow(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE_3_LEVELS}
          collapsedDepth={0}
        />
      );

      wrapper.instance().expandNode('1');
      const test = {
        '0': true,
        '1/0': true,
        '1/1': true,
        '1/2': true,
        '1/2/0': true,
        '1/2/1': true,
        '1/2/2': true
      };

      expect(wrapper.state().collapsed).toEqual(test);
    });

    it('should have no effect if selected is controlled or uncontrolled', () => {
      const wrapper = shallow(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE_3_LEVELS}
          collapsedDepth={1}
          defaultCollapsed={{ '0': true }}
        />
      );

      expect(
        wrapper
          .find(Node)
          .first()
          .props().collapsed
      ).toBe(true);

      wrapper.setProps({ collapsed: { 1: true } });
      expect(
        wrapper
          .find(Node)
          .at(1)
          .props().collapsed
      ).toBe(true);
    });
  });

  describe('defaultCollapsedDepth', () => {
    it('defaults to undefined', () => {
      const wrapper = shallow(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);
      expect(wrapper.props().collapsedDepth).toEqual(undefined);
    });

    it('should be used as initial this.state.collapsedDepth', () => {
      const wrapper = shallow(
        <TreeView
          defaultCollapsedDepth={1}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );
      expect(wrapper.state().collapsedDepth).toEqual(1);
    });

    it('should transition state to null when a node is collapsed', () => {
      const wrapper = shallow(
        <TreeView
          defaultCollapsedDepth={1}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      wrapper.instance().expandNode('0');
      expect(wrapper.state().collapsedDepth).toBe(null);
    });

    it('defaultCollapsedDepth=0, if node changes collapse state should update correct', () => {
      const wrapper = shallow(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE_3_LEVELS}
          defaultCollapsedDepth={0}
        />
      );

      wrapper.instance().expandNode('1');
      const test = {
        '0': true,
        '1/0': true,
        '1/1': true,
        '1/2': true,
        '1/2/0': true,
        '1/2/1': true,
        '1/2/2': true
      };

      expect(wrapper.state().collapsed).toEqual(test);
    });
  });

  describe('onCollapsedDepthChange', () => {
    it('should be called with null when collapse changes', () => {
      const onCollapsedDepthChange = jest.fn();
      const wrapper = shallow(
        <TreeView
          collapsedDepth={0}
          dataSource={NESTED_DATA_STRUCTURE_3_LEVELS}
          onCollapsedDepthChange={onCollapsedDepthChange}
        />
      );

      wrapper.instance().collapseNode('0');
      expect(onCollapsedDepthChange.mock.calls[0][0]).toBe(null);
    });
  });
});
