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
import { mount } from 'enzyme';
import Node from '../../Node';
import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('node.label', () => {
  it('should render as a string', () => {
    const wrapper = mount(<Node node={{ label: 'hello world' }} />);
    window.wrapper = wrapper;
    expect(
      wrapper.find(`.zippy-react-toolkit-tree-view__node__label__text`).text()
    ).to.be.equal('hello world');
  });

  it('should render as jsx', () => {
    const wrapper = mount(
      <Node node={{ label: <div id="labelJSX">hello world</div> }} />
    );
    expect(wrapper.find('#labelJSX')).to.have.length(1);
  });

  it('should render as a function', () => {
    const label = sinon.stub();
    label.returns(<div id="functionLabel">hello world</div>);
    const wrapper = mount(<Node id="customId" node={{ label }} />);

    expect(label.called).to.be.true;
    expect(wrapper.find('#functionLabel')).to.have.length(1);
    expect(label.args[0][0].id).to.be.equal('customId');
  });
});
