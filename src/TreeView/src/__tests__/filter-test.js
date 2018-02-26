/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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

    const test = () => wrapper.find(Node).reduce(
      (acc, node) => {
        if (node.props().hidden) {
          acc += 1;
        }
        return acc;
      },
      0
    );

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
    expect(wrapper.state().checked).to.deep.equal({
      '1': true,
      '1/0': true
    });
  });
});
