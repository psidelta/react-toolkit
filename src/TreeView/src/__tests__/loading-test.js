import React from 'react';
import TreeView from '../TreeView';
import { shallow } from 'enzyme';

describe('loading', () => {
  it('should render load mask when loading is true', () => {
    const wrapper = shallow(<TreeView dataSource={[]} loading />);
    expect(wrapper.text()).to.be.equal('Loading...');
  });
  it('should call renderLoader if loading and render what it returns', () => {
    const renderLoader = sinon.stub();
    renderLoader.returns(<div id="customLoader" />);
    const wrapper = shallow(
      <TreeView renderLoader={renderLoader} dataSource={[]} loading />
    );
    expect(renderLoader.called).to.be.true;
    expect(wrapper.find('#customLoader')).to.have.length(1);
  });
});
