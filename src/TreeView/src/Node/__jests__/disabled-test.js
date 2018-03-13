import React from 'react';
import { shallow } from 'enzyme';
import Node from '../index';
import ExpandTool from '../ExpandTool';
import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('disabled', () => {
  let wrapper;
  let label;
  let expandTool;

  beforeEach(() => {
    wrapper = shallow(<Node disabled hasChildren node={{ label: 'test' }} />);
    label = wrapper.find(`.${CLASS_NAME}__node__label`);
    expandTool = wrapper.find(ExpandTool);
  });

  describe('onClick', () => {
    it('should not call onCollapsedChange', () => {
      const onCollapsedChange = jest.fn();
      wrapper.setProps({ onCollapsedChange });
      expandTool.simulate('click', { stopPropagation: () => {} });

      expect(onCollapsedChange).toHaveBeenCalledTimes(0);
    });

    it('should not call onSelectionChange', () => {
      const onSelectionChange = jest.fn();
      wrapper.setProps({ onSelectionChange });
      label.simulate('click', { stopPropagation: () => {} });

      expect(onSelectionChange).toHaveBeenCalledTimes(0);
    });

    it('should not call onActiveNodeChange', () => {
      const onActiveNodeChange = jest.fn();
      wrapper.setProps({ onActiveNodeChange });
      label.simulate('click', { stopPropagation: () => {} });

      expect(onActiveNodeChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('doubleClick', () => {
    beforeEach(() => {
      wrapper.setProps({ expandOnDoubleClick: true });
    });

    describe('expander', () => {
      it('should not call onCollapsedChange', () => {
        const onCollapsedChange = jest.fn();
        wrapper.setProps({ onCollapsedChange });
        expandTool.simulate('doubleClick', { stopPropagation: () => {} });

        expect(onCollapsedChange).toHaveBeenCalledTimes(0);
      });
    });

    describe('label', () => {
      it('should not call onCollapsedChange', () => {
        const onCollapsedChange = jest.fn();
        wrapper.setProps({ onCollapsedChange });
        label.simulate('doubleClick', { stopPropagation: () => {} });

        expect(onCollapsedChange).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('checked', () => {
    it('should not trigger onCheckedChange', () => {
      const onCheckedChange = jest.fn();

      wrapper.setProps({ onCheckedChange, enableChecked: true });
      const check = wrapper.find(`.${CLASS_NAME}__node__checkbox`);
      check.simulate('click', { stopPropagation: () => {} });

      expect(onCheckedChange).toHaveBeenCalledTimes(0);
    });
  });
});
