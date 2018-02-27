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
      const onCollapsedChange = sinon.spy();
      wrapper.setProps({ onCollapsedChange });
      expandTool.simulate('click', { stopPropagation: () => {} });

      expect(onCollapsedChange.called).to.be.false;
    });

    it('should not call onSelectionChange', () => {
      const onSelectionChange = sinon.spy();
      wrapper.setProps({ onSelectionChange });
      label.simulate('click', { stopPropagation: () => {} });

      expect(onSelectionChange.called).to.be.false;
    });

    it('should not call onActiveNodeChange', () => {
      const onActiveNodeChange = sinon.spy();
      wrapper.setProps({ onActiveNodeChange });
      label.simulate('click', { stopPropagation: () => {} });

      expect(onActiveNodeChange.called).to.be.false;
    });
  });

  describe('doubleClick', () => {
    beforeEach(() => {
      wrapper.setProps({ expandOnDoubleClick: true });
    });

    describe('expander', () => {
      it('should not call onCollapsedChange', () => {
        const onCollapsedChange = sinon.spy();
        wrapper.setProps({ onCollapsedChange });
        expandTool.simulate('doubleClick', { stopPropagation: () => {} });

        expect(onCollapsedChange.called).to.be.false;
      });
    });

    describe('label', () => {
      it('should not call onCollapsedChange', () => {
        const onCollapsedChange = sinon.spy();
        wrapper.setProps({ onCollapsedChange });
        label.simulate('doubleClick', { stopPropagation: () => {} });

        expect(onCollapsedChange.called).to.be.false;
      });
    });
  });

  describe('checked', () => {
    it('should not trigger onCheckedChange', () => {
      const onCheckedChange = sinon.spy();

      wrapper.setProps({ onCheckedChange, enableChecked: true });
      const check = wrapper.find(`.${CLASS_NAME}__node__check`);
      check.simulate('click', { stopPropagation: () => {} });

      expect(onCheckedChange.called).to.be.false;
    });
  });
});
