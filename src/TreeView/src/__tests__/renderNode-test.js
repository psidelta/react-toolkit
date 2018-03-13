import React from 'react';
import TreeView from '../TreeView';
import { mount } from 'enzyme';

describe('renderNode', () => {
  const dataSource = [{ label: 'hello world' }];
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<TreeView dataSource={dataSource} />);
  });

  it('is called', () => {
    const renderNode = sinon.spy();
    wrapper.setProps({ renderNode });
    expect(renderNode.called).to.be.true;
  });

  it('renders what renderNode returns', () => {
    const renderNode = () => <div key={1} id="customRow" />;
    wrapper.setProps({ renderNode });
    expect(wrapper.find('#customRow')).to.have.length(1);
  });

  it('mutating props changes props used for rendering row', () => {
    const renderNode = ({ domProps, nodeProps }) => {
      domProps.id = 'mutatedId';
      domProps.className = 'customRowClass';
    };
    wrapper.setProps({ renderNode });

    expect(wrapper.find('#mutatedId')).to.have.length(1);
    // expect(wrapper.find('.customRowClass')).to.have.length(1)
    // expect(wrapper.find('.react-tree-view__node')).to.have.length(0)
  });
});
