/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TreeView from '../TreeView';
import Node from '../Node';
import { mount, shallow } from 'enzyme';
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

describe('collapsed props', () => {
  describe('defaultCollapsed', () => {
    it('should default to empty object', () => {
      const wrapper = shallow(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);
      expect(wrapper.state().collapsed).toEqual({});
    });

    it('should be used as initial state', () => {
      const defaultCollapsed = { 0: true };
      const wrapper = shallow(
        <TreeView
          defaultCollapsed={defaultCollapsed}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      expect(wrapper.state().collapsed).toEqual(defaultCollapsed);
    });
  });

  describe('collapsed', () => {
    it('should not update this.state.collapsed', () => {
      const wrapper = shallow(
        <TreeView collapsed={{}} dataSource={NESTED_DATA_STRUCTURE} />
      );
      wrapper.instance().collapseNode('0');

      expect(wrapper.state().collapsed).toEqual({});
    });

    it('should use correct collapsed state', () => {
      const wrapper = shallow(
        <TreeView
          collapsed={{ '3': true }}
          defaultCollapsed={{ '1': true, '2': true }}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      expect(wrapper.instance().getCurrentCollapsedState()).toEqual({
        '3': true
      });
    });
  });

  describe('isNodeCollapsed', () => {
    it('should be called with correct props', () => {
      const isNodeCollapsed = jest.fn();
      const wrapper = mount(
        <TreeView
          isNodeCollapsed={isNodeCollapsed}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      expect(isNodeCollapsed).toHaveBeenCalled();
    });

    it('should overwrite controlled or uncontrolled collapsed', () => {
      const isNodeCollapsed = () => true;
      const wrapper = mount(
        <TreeView
          collapsed={{ '0': false, '1': true }}
          isNodeCollapsed={isNodeCollapsed}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      expect(
        wrapper
          .find(Node)
          .first()
          .props().collapsed
      ).toBe(true);
    });

    it('should take into account isNodeCollapsed state when collapse changes', () => {
      const isNodeCollapsed = () => true;
      const onCollapsedChange = jest.fn();

      const wrapper = mount(
        <TreeView
          collapsed={{ '0': false, '1': false }}
          isNodeCollapsed={isNodeCollapsed}
          dataSource={NESTED_DATA_STRUCTURE}
          onCollapsedChange={onCollapsedChange}
        />
      );

      wrapper.instance().expandNode('0');
      window.onCollapsedChange = onCollapsedChange;
      expect(onCollapsedChange.mock.calls[0][0].collapsedMap).toEqual({
        '1': true,
        '1/0': true,
        '1/1': true,
        '1/2': true
      });
    });
  });
});
