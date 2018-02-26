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

describe('expandOnDoubleClick', () => {
  describe('default =  false', () => {
    describe('click', () => {
      let wrapper;
      let onCollapsedChange;
      let label;
      let expandTool;

      beforeEach(() => {
        onCollapsedChange = sinon.spy();
        wrapper = shallow(
          <Node hasChildren onCollapsedChange={onCollapsedChange} />
        );
        label = wrapper.find(`.${CLASS_NAME}__node__label`);
        expandTool = wrapper.find(ExpandTool);
      });

      it('should call onCollapsedChange onClick on label', () => {
        label.simulate('click', { stopPropagation: () => {} });
        expect(onCollapsedChange.called).to.be.true;
      });

      it('should call onCollapsedChange onClick on expandTool', () => {
        expandTool.simulate('click', { stopPropagation: () => {} });
        expect(onCollapsedChange.called).to.be.true;
      });

      it('should not call onCollapsedChange on doubleClick on label', () => {
        expandTool.simulate('doubleClick', { stopPropagation: () => {} });
        expect(onCollapsedChange.called).to.be.false;
      });

      it('should not call onCollapsedChange on doubleClick on expandTool', () => {
        expandTool.simulate('doubleClick', { stopPropagation: () => {} });
        expect(onCollapsedChange.called).to.be.false;
      });
    });
  });
  describe('=true', () => {
    describe('click', () => {
      let wrapper;
      let onCollapsedChange;
      let label;
      let expandTool;

      beforeEach(() => {
        onCollapsedChange = sinon.spy();
        wrapper = shallow(
          <Node
            hasChildren
            expandOnDoubleClick
            onCollapsedChange={onCollapsedChange}
          />
        );
        label = wrapper.find(`.${CLASS_NAME}__node__label`);
        expandTool = wrapper.find(ExpandTool);
      });

      it('should not call onCollapsedChange onClick on label', () => {
        label.simulate('click', { stopPropagation: () => {} });
        expect(onCollapsedChange.called).to.be.false;
      });

      it('should not call onCollapsedChange onClick on expandTool', () => {
        expandTool.simulate('click', { stopPropagation: () => {} });
        expect(onCollapsedChange.called).to.be.false;
      });

      it('should call onCollapsedChange on doubleClick on label', () => {
        expandTool.simulate('doubleClick', { stopPropagation: () => {} });
        expect(onCollapsedChange.called).to.be.true;
      });

      it('should call onCollapsedChange on doubleClick on expandTool', () => {
        expandTool.simulate('doubleClick', { stopPropagation: () => {} });
        expect(onCollapsedChange.called).to.be.true;
      });
    });
  });
});
