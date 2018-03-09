import React from 'react';
import { shallow } from 'enzyme';
import TreeView from '../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('style', () => {
  it('should be applied on comp', () => {
    const style = { color: 'blue' };
    const wrapper = shallow(<TreeView style={style} dataSource={[]} />);
    expect(wrapper.find(`.${CLASS_NAME}`).prop('style')).toEqual(style);
  });
});
