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
import { shallow } from 'enzyme';
import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('active', () => {
  it('should have the correct className', () => {
    const wrapper = shallow(<Node />);
    expect(wrapper.find(`.${CLASS_NAME}__node--active`)).to.have.length(0);
    wrapper.setProps({ active: true });
    expect(wrapper.find(`.${CLASS_NAME}__node--active`)).to.have.length(1);
  });

  it('should call onActiveNodeChange when label is clicked', () => {
    const onActiveNodeChange = sinon.spy();
    const wrapper = shallow(
      <Node
        enableKeyboardNavigation={true}
        path="0"
        onActiveNodeChange={onActiveNodeChange}
      />
    );

    wrapper.find(`.${CLASS_NAME}__node__label`).simulate('click', {
      stopPropagation: () => {}
    });

    expect(onActiveNodeChange.called).to.be.true;
    expect(onActiveNodeChange.args[0][0].path).to.equal('0');
  });
});
