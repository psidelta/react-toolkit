import React from 'react';
import { mount } from 'enzyme';

import Node from '../../Node';
import TreeView from '../../TreeView';

import Check from '../../../../CheckBox';

const CLASS_NAME = TreeView.defaultProps.rootClassname;

describe('checked', () => {
  describe('enableChecked', () => {
    it('should render not render checkboxes if false', () => {
      const wrapper = mount(<Node />);
      expect(wrapper.find(Check)).toHaveLength(0);
    });

    it('should render checkboxes if true', () => {
      const wrapper = mount(<Node enableChecked />);
      expect(wrapper.find(Check)).toHaveLength(1);
    });
  });

  describe('onCheckedChange', () => {
    it('is called when checked changes', () => {
      const onCheckedChange = sinon.spy();
      const wrapper = mount(
        <Node enableChecked debug onCheckedChange={onCheckedChange} />
      );

      wrapper.find(Check).simulate('change', {
        target: {
          checked: true
        }
      });

      expect(onCheckedChange.called).toBe(true);
    });
  });
});
