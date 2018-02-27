import React from 'react';
import { shallow } from 'enzyme';
import TreeView from '../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('className', () => {
  const wrapper = shallow(<TreeView className="testTree" dataSource={[]} />);
  it(`should have ${CLASS_NAME} className`, () => {
    expect(wrapper.find(`.${CLASS_NAME}`)).to.have.length(1);
  });
  it('className props is added', () => {
    expect(wrapper.find('.testTree')).to.have.length(1);
  });
  it('theme className is added by default', () => {
    expect(wrapper.find(`.${CLASS_NAME}--theme-default`)).to.have.length(1);
  });
  it('theme prop is added', () => {
    wrapper.setProps({ theme: 'test-theme' });
    expect(wrapper.find(`.${CLASS_NAME}--theme-default`)).to.have.length(0);
    expect(wrapper.find(`.${CLASS_NAME}--theme-test-theme`)).to.have.length(1);
  });
});
