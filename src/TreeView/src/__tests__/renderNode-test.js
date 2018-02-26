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
