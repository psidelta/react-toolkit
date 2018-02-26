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
import { shallow, mount } from 'enzyme';
import Node from '../index';
import ExpandTool from '../ExpandTool';

import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('expandOnToolOnly', () => {
  describe('false', () => {
    it('should call this.props.onCollapsedChange on click on label', () => {
      const onCollapsedChange = sinon.spy();
      const wrapper = shallow(
        <Node hasChildren onCollapsedChange={onCollapsedChange} />
      );
      wrapper.find(`.${CLASS_NAME}__node__label`).simulate('click', {
        stopPropagation: () => {}
      });
      expect(onCollapsedChange.called).to.be.true;
    });
  });

  describe('true', () => {
    it('should call this.props.onCollapsedChange only on ExpandTool', () => {
      const onCollapsedChange = sinon.spy();
      const wrapper = mount(
        <Node
          hasChildren
          expandOnToolOnly
          onCollapsedChange={onCollapsedChange}
        />
      );

      wrapper.find(`.${CLASS_NAME}__node__label`).simulate('click', {
        stopPropagation: () => {}
      });
      expect(onCollapsedChange.called).to.be.false;

      wrapper.find(ExpandTool).simulate('click', {
        stopPropagation: () => {}
      });
      expect(onCollapsedChange.called).to.be.true;
    });
  });
});
