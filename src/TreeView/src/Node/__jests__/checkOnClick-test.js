import React from 'react';
import { mount } from 'enzyme';

import Node from '../../Node';
import TreeView from '../../TreeView';

const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('checkOnClick', () => {
  it('should default to false', () => {
    const wrapper = mount(<Node />);
    expect(wrapper.props().checkOnClick).toBe(true);
  });
  it('should not trigger onCheckedChange if false', () => {
    const onCheckedChange = jest.fn();
    const wrapper = mount(
      <Node checkOnClick={false} onCheckedChange={onCheckedChange} />
    );
    wrapper.instance().onLabelClick({ stopPropagation: () => {} });
    expect(onCheckedChange).toHaveBeenCalledTimes(0);
  });

  it('should trigger onCheckedChange if true', () => {
    const onCheckedChange = jest.fn();
    const wrapper = mount(
      <Node checkOnClick onCheckedChange={onCheckedChange} />
    );
    wrapper.instance().onLabelClick({ stopPropagation: () => {} });
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
  });
});
