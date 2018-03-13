import React from 'react';
import Node from '../../Node';
import { mount } from 'enzyme';

import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('checkOnClick', () => {
  it('should default to false', () => {
    const wrapper = mount(<Node />);
    expect(wrapper.props().checkOnClick).to.be.true;
  });
  it('should not trigger onCheckedChange if false', () => {
    const onCheckedChange = sinon.spy();
    const wrapper = mount(
      <Node checkOnClick={false} onCheckedChange={onCheckedChange} />
    );
    wrapper.instance().onLabelClick({ stopPropagation: () => {} });
    expect(onCheckedChange.called).to.be.false;
  });

  it('should trigger onCheckedChange if true', () => {
    const onCheckedChange = sinon.spy();
    const wrapper = mount(
      <Node checkOnClick onCheckedChange={onCheckedChange} />
    );
    wrapper.instance().onLabelClick({ stopPropagation: () => {} });
    expect(onCheckedChange.called).to.be.true;
  });
});
