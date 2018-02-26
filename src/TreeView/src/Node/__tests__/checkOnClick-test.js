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
import Node from '../../Node';
import { mount } from 'enzyme';

import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('checkOnClick', () => {
  it('should default to false', () => {
    const wrapper = mount(<Node />);
    expect(wrapper.props().checkOnClick).to.be.true;
  });
  it('should not trigger onCheckedChange if false', () => {
    const onCheckedChange = sinon.spy();
    const wrapper = mount(
      <Node checkOnClick={false} onCheckedChange={onCheckedChange} />
    );
    wrapper.instance().onLabelClick({ stopPropagation: () => {} });
    expect(onCheckedChange.called).to.be.false;
  });

  it('should trigger onCheckedChange if true', () => {
    const onCheckedChange = sinon.spy();
    const wrapper = mount(
      <Node checkOnClick onCheckedChange={onCheckedChange} />
    );
    wrapper.instance().onLabelClick({ stopPropagation: () => {} });
    expect(onCheckedChange.called).to.be.true;
  });
});
