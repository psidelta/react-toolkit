import React from 'react';
import TreeView from '../../TreeView';
import Node from '../../Node';
import { shallow } from 'enzyme';

const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('item.className', () => {
  it('should add className prop on root', () => {
    const className = 'test className';
    const wrapper = shallow(<Node node={{ className }} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });
});
