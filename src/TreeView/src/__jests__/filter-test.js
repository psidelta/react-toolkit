/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

    expect(test()).toEqual(1);

    wrapper.setProps({
      filter: ({ node }) => node.label === 'test'
    });

    expect(test()).toEqual(2);
  });

  xit('should not influence checkboxes', done => {
    wrapper.setProps({
      filter: ({ node }) => node.label === 'foo'
    });

    wrapper.instance().checkNode('1');
    setTimeout(() => {
      console.log(wrapper.state());
      expect(wrapper.state().checked).toEqual({
        '1': true,
        '1/0': true
      });
      done();
    }, 100);
  });
});
