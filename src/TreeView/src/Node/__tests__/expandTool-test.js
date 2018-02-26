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
import ExpandTool from '../ExpandTool';
import Node from '../../Node';

import TreeView from '../../TreeView';
const CLASS_NAME = TreeView.defaultProps.rootClassName;

describe('expandTool', () => {
  describe('default', () => {
    it('should render default expand component', () => {
      const wrapper = mount(<Node hasChildren />);
      expect(wrapper.find(ExpandTool)).to.have.length(1);
    });
  });

  describe('jsx', () => {
    const wrapper = mount(
      <Node hasChildren expandTool={<div id="custom_expander" />} />
    );

    it('shoud render custom expander', () => {
      const test = wrapper.find('#custom_expander');
      expect(test).to.have.length(1);
    });

    it('should not render default expand tool', () => {
      expect(wrapper.find(ExpandTool)).to.have.length(0);
    });

    it(`should have ${CLASS_NAME}__node__expander and --collapsed classNames`, () => {
      const wrapper = mount(
        <Node hasChildren expandTool={<div id="custom_expander" />} />
      );
      const test = wrapper.find('#custom_expander');
      expect(test.hasClass(`${CLASS_NAME}__node__expander`)).to.be.true;
      wrapper.setProps({ collapsed: true });
      expect(test.hasClass(`${CLASS_NAME}__node__expander--collapsed`)).to.be
        .true;
    });
  });

  describe('function', () => {
    it('should be callsed', () => {
      const expandTool = sinon.spy();
      const wrapper = mount(<Node hasChildren expandTool={expandTool} />);
      expect(expandTool.called).to.be.true;
    });

    it('should be callsed with correct params', () => {
      const expandTool = sinon.spy();
      const wrapper = mount(<Node hasChildren expandTool={expandTool} />);
      expect(expandTool.args[0][0].domProps.onClick).to.be.a('function');
      expect(expandTool.args[0][0].domProps.className).to.be.a('string');
    });

    it('should render what it returns', () => {
      const expandTool = ({ domProps, nodeProps }) => {
        return <div {...domProps} id="custom_expander" />;
      };
      const wrapper = mount(<Node hasChildren expandTool={expandTool} />);
      const test = wrapper.find('#custom_expander');
      expect(test).to.have.length(1);
      expect(test.hasClass(`${CLASS_NAME}__node__expander`)).to.be.true;
      expect(test.hasClass(`${CLASS_NAME}__node__expander--collapsed`)).to.be
        .false;
      wrapper.setProps({ collapsed: true });
      expect(test.hasClass(`${CLASS_NAME}__node__expander--collapsed`)).to.be
        .true;
    });
  });

  describe('string', () => {
    const wrapper = mount(<Node hasChildren expandTool="test" />);
    const test = wrapper.find(ExpandTool);

    it('should render', () => {
      expect(test).to.have.length(1);
    });

    it('should render the string', () => {
      expect(test.props().children).to.equal('test');
    });

    it('should have the correct className', () => {
      expect(test.hasClass(`${CLASS_NAME}__node__expander`));
    });

    it('should have the correct --collapsed className', () => {
      wrapper.setProps({ collapsed: true });
      expect(test.hasClass(`${CLASS_NAME}__node__expander--collapsed`));
    });
  });
});
