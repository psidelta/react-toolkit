import React from 'react';
import TreeView from '../TreeView';
import Node from '../Node';
import { mount } from 'enzyme';

describe('filter', () => {
  const dataSource = [
    { label: 'test' },
    {
      label: 'foo',
      nodes: [{ label: 'bar' }]
    },
    { label: 'bar' }
  ];

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<TreeView dataSource={dataSource} />);
  });

  it('should render filtered elements null', () => {
    wrapper.setProps({
      filter: ({ node }) => node.label === 'bar'
    });

    const test = () =>
      wrapper.find(Node).reduce((acc, node) => {
        if (node.props().hidden) {
          acc += 1;
        }
        return acc;
      }, 0);

    expect(test()).to.be.equal(1);

    wrapper.setProps({
      filter: ({ node }) => node.label === 'test'
    });

    expect(test()).to.equal(2);
  });

  it('should not influence checkboxes', () => {
    wrapper.setProps({
      filter: ({ node }) => node.label === 'foo'
    });

    wrapper.instance().checkNode('1');
    expect(wrapper.state().checked).toEqual({
      '1': true,
      '1/0': true
    });
  });
});
