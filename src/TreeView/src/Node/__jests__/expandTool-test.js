/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
      expect(wrapper.find(ExpandTool)).toHaveLength(1);
    });
  });

  describe('jsx', () => {
    const wrapper = mount(
      <Node hasChildren expandTool={<div id="custom_expander" />} />
    );

    it('shoud render custom expander', () => {
      const test = wrapper.find('#custom_expander');
      expect(test).toHaveLength(1);
    });

    it('should not render default expand tool', () => {
      expect(wrapper.find(ExpandTool)).toHaveLength(0);
    });

    it(`should have ${CLASS_NAME}__node__expander and --collapsed classNames`, () => {
      let wrapper = mount(
        <Node hasChildren expandTool={<div id="custom_expander" />} />
      );
      let test = wrapper.find('#custom_expander');
      expect(test.hasClass(`${CLASS_NAME}__node__expander`)).toBe(true);

      wrapper = mount(
        <Node hasChildren expandTool={<div id="custom_expander" />} collapsed />
      );
      test = wrapper.find('#custom_expander');
      expect(test.hasClass(`${CLASS_NAME}__node__expander--collapsed`)).toBe(
        true
      );
    });
  });

  describe('function', () => {
    it('should be called', () => {
      const expandTool = jest.fn();
      const wrapper = mount(<Node hasChildren expandTool={expandTool} />);
      expect(expandTool).toHaveBeenCalled();
    });

    it('should be called with correct params', () => {
      const expandTool = jest.fn();
      const wrapper = mount(<Node hasChildren expandTool={expandTool} />);
      expect(typeof expandTool.mock.calls[0][0].domProps.onClick).toBe(
        'function'
      );
      expect(typeof expandTool.mock.calls[0][0].domProps.className).toBe(
        'string'
      );
    });

    it('should render what it returns', () => {
      const expandTool = ({ domProps, nodeProps }) => {
        return <div {...domProps} id="custom_expander" />;
      };
      let wrapper = mount(<Node hasChildren expandTool={expandTool} />);
      let test = wrapper.find('#custom_expander');
      expect(test).toHaveLength(1);

      expect(test.hasClass(`${CLASS_NAME}__node__expander`)).toBe(true);
      expect(test.hasClass(`${CLASS_NAME}__node__expander--collapsed`)).toBe(
        false
      );

      wrapper = mount(<Node hasChildren expandTool={expandTool} collapsed />);
      test = wrapper.find('#custom_expander');

      expect(test.hasClass(`${CLASS_NAME}__node__expander--collapsed`)).toBe(
        true
      );
    });
  });

  describe('string', () => {
    const wrapper = mount(<Node hasChildren expandTool="test" />);
    const test = wrapper.find(ExpandTool);

    it('should render', () => {
      expect(test).toHaveLength(1);
    });

    it('should render the string', () => {
      expect(test.props().children).toEqual('test');
    });

    it('should have the correct className', () => {
      expect(test.hasClass(`${CLASS_NAME}__node__expander`));
    });

    it('should have the correct --collapsed className', () => {
      const wrapper = mount(<Node hasChildren expandTool="test" collapsed />);
      const test = wrapper.find(ExpandTool);
      expect(test.hasClass(`${CLASS_NAME}__node__expander--collapsed`));
    });
  });
});
