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

describe('checked props', () => {
  describe('defaultChecked', () => {
    it('should be used as initial state for checked', () => {
      const defaultChecked = { '0': true };
      const wrapper = shallow(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE}
          defaultChecked={defaultChecked}
        />
      );

      expect(wrapper.state().checked).toEqual(defaultChecked);
    });
  });

  describe('checked', () => {
    it('should use correct checked state', () => {
      const checked = { '2': true };
      const wrapper = shallow(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE}
          checked={checked}
          defaultChecked={{ '1': true }}
        />
      );

      expect(wrapper.instance().getCurrentCheckedState()).toEqual(checked);
    });

    xit('should not update this.state.checked', () => {
      const checked = { '1/1': true };
      const wrapper = mount(
        <TreeView dataSource={NESTED_DATA_STRUCTURE} checked={checked} />
      );

      wrapper.instance().checkNode('1/2');

      expect(wrapper.state().checked).toEqual({});
    });
  });

  describe('enableChecked', () => {
    it('enableChecked is passed to nodes', () => {
      const wrapper = mount(
        <TreeView enableChecked={false} dataSource={NESTED_DATA_STRUCTURE} />
      );
      expect(
        wrapper
          .find(Node)
          .first()
          .props().enableChecked
      ).toBe(false);
    });
  });

  describe('checkOnSelect', () => {
    it('when a node is selected it should trigger also a check', () => {
      const onCheckedChange = jest.fn();
      const wrapper = mount(
        <TreeView
          enableChecked
          checkOnSelect
          onCheckedChange={onCheckedChange}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      wrapper.instance().selectNode('0');
      expect(onCheckedChange).toHaveBeenCalled();
      expect(wrapper.state().checked[0]).toBe(true);
      expect(onCheckedChange.mock.calls[0][0].checkedMap).toEqual({
        '0': true
      });
    });
  });

  describe('getUpdatedDataSource', () => {
    it('should update correctly dataSource', () => {
      let newDataSource;
      const onCheckedChange = ({ getUpdatedDataSource }) => {
        newDataSource = getUpdatedDataSource(
          ({ node, nodeProps, selected }) => {
            node.customPropertyInjecter = true;
          }
        );
      };
      const wrapper = mount(
        <TreeView
          enableChecked
          dataSource={NESTED_DATA_STRUCTURE}
          onCheckedChange={onCheckedChange}
        />
      );

      wrapper.instance().checkNode('0');

      expect(wrapper.state().data).not.toEqual(newDataSource);
      expect(newDataSource[0].customPropertyInjecter).toBe(true);
    });
  });

  describe('isNodeChecked', () => {
    it('should be called with correct props', () => {
      const isNodeChecked = jest.fn();
      const wrapper = mount(
        <TreeView
          enableChecked
          checked={{ 0: false }}
          isNodeChecked={isNodeChecked}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      const args = isNodeChecked.mock.calls[0][0];

      expect(isNodeChecked).toHaveBeenCalled();
      expect(args.index).toEqual(0);
    });

    it('should overwrite controlled or uncontrolled checked', () => {
      const isNodeChecked = () => true;
      const wrapper = mount(
        <TreeView
          enableChecked
          isNodeChecked={isNodeChecked}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      expect(
        wrapper
          .find(Node)
          .first()
          .props().checked
      ).toBe(true);
    });

    it('should take into account isNodeChecked state when selected changes', () => {
      const isNodeChecked = () => true;
      const onCheckedChange = jest.fn();

      const wrapper = mount(
        <TreeView
          enableChecked
          isNodeChecked={isNodeChecked}
          dataSource={NESTED_DATA_STRUCTURE}
          onCheckedChange={onCheckedChange}
        />
      );

      wrapper.instance().checkNode('0');
      expect(onCheckedChange.mock.calls[0][0].checkedMap).toEqual({
        '0': true,
        '1': true,
        '1/0': true,
        '1/1': true,
        '1/2': true
      });
    });
  });
});
