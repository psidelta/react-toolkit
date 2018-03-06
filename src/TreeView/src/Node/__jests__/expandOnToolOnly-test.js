import React from 'react';
import { shallow, mount } from 'enzyme';
import Node from '../index';
import ExpandTool from '../ExpandTool';

import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('expandOnToolOnly', () => {
  describe('false', () => {
    it('should call this.props.onCollapsedChange on click on label', () => {
      const onCollapsedChange = jest.fn();
      const wrapper = shallow(
        <Node hasChildren onCollapsedChange={onCollapsedChange} />
      );
      wrapper.find(`.${CLASS_NAME}__node__label`).simulate('click', {
        stopPropagation: () => {}
      });
      expect(onCollapsedChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('true', () => {
    it('should call this.props.onCollapsedChange only on ExpandTool', () => {
      const onCollapsedChange = jest.fn();
      const wrapper = mount(
        <Node
          hasChildren
          expandOnToolOnly
          onCollapsedChange={onCollapsedChange}
        />
      );

      wrapper.find(`.${CLASS_NAME}__node__label`).simulate('click', {
        stopPropagation: () => {}
      });
      expect(onCollapsedChange).toHaveBeenCalledTimes(0);

      wrapper.find(ExpandTool).simulate('click', {
        stopPropagation: () => {}
      });
      expect(onCollapsedChange).toHaveBeenCalledTimes(1);
    });
  });
});
