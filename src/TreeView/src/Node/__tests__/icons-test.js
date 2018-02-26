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

describe('icons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Node />);
  });

  describe('nodeIcon', () => {
    it('should render img if a string', () => {
      wrapper.setProps({
        nodeIcon: 'test'
      });
      expect(wrapper.find(`.${CLASS_NAME}__node__icon-img`)).to.have.length(1);
    });

    it('it should render jsx', () => {
      wrapper.setProps({
        nodeIcon: <div id="customIcon" />
      });
      expect(wrapper.find('#customIcon')).to.have.length(1);
    });
  });

  describe('leafNodeIcon', () => {
    it('should render if it is collapsed jsx and overwrite nodeIcon', () => {
      wrapper.setProps({
        collapsed: true,
        nodeIcon: <div id="customIcon" />,
        leafNodeIcon: <div id="customIcon2" />
      });
      expect(wrapper.find('#customIcon2')).to.have.length(1);
      expect(wrapper.find('#customIcon')).to.have.length(0);
    });
    it('should render img if a string', () => {
      wrapper.setProps({
        leafNodeIcon: 'test'
      });
      expect(wrapper.find(`.${CLASS_NAME}__node__icon-img`)).to.have.length(1);
    });
  });

  describe('nodeCollapsedIcon', () => {
    it('should render if it is collapsed jsx and overwrite nodeIcon', () => {
      wrapper.setProps({
        hasChildren: true,
        collapsed: true,
        nodeIcon: <div id="customIcon" />,
        nodeCollapsedIcon: <div id="customIcon2" />
      });
      expect(wrapper.find('#customIcon2')).to.have.length(1);
      expect(wrapper.find('#customIcon')).to.have.length(0);
    });
    it('should render img if a string', () => {
      wrapper.setProps({
        collapsed: true,
        hasChildren: true,
        nodeCollapsedIcon: 'test'
      });
      expect(wrapper.find(`.${CLASS_NAME}__node__icon-img`)).to.have.length(1);
    });
  });
});
