/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';

const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('size', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  describe('resizable bool', () => {
    it('adds --resizable classname', () => {
      wrapper.setProps({ resizable: true });
      expect(wrapper.find(`.${ROOT_CLASS}--resizable`).length).toBeGreaterThan(
        0
      );
    });
    it("false doen't render any resize handlers", () => {
      wrapper.setProps({ resizable: false });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).toHaveLength(0);
    });
  });

  describe('resizable object', () => {
    it('renders only left right handles when restricted to width', () => {
      wrapper.setProps({
        resizable: {
          width: true
        }
      });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');

      expect(wrapper.find(`.${ROOT_CLASS}__handle--l`)).toHaveLength(1);
      expect(wrapper.find(`.${ROOT_CLASS}__handle--r`)).toHaveLength(1);
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).toHaveLength(2);
    });
    it('renders only top bottom handles when restricted to height', () => {
      wrapper.setProps({
        resizable: {
          height: true
        }
      });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');

      expect(wrapper.find(`.${ROOT_CLASS}__handle--t`)).toHaveLength(1);
      expect(wrapper.find(`.${ROOT_CLASS}__handle--b`)).toHaveLength(1);
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).toHaveLength(2);
    });
    it('takes into account resizeHandles', () => {
      wrapper.setProps({
        resizable: {
          width: true
        },
        resizeHandles: ['l']
      });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');

      expect(wrapper.find(`.${ROOT_CLASS}__handle--l`)).toHaveLength(1);
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).toHaveLength(1);
    });
  });

  describe('size constroled and uncontroled', () => {
    it('adds width and height on style', () => {
      wrapper.setProps({
        size: {
          width: 120,
          height: 220
        }
      });
      expect(
        wrapper
          .find(`.${ROOT_CLASS}`)
          .first()
          .props().style.width
      ).toEqual(120);
      expect(
        wrapper
          .find(`.${ROOT_CLASS}`)
          .first()
          .props().style.height
      ).toEqual(220);
    });
    it('size overwrites uncontrolled size', () => {
      wrapper.setProps({ size: { width: 20 } });
      wrapper.setState({ size: { width: 10 } });
      expect(wrapper.instance().getSize().width).toEqual(20);
    });
    it('defaults to defaultSize when size is not set', () => {
      const wrapper = mount(<Window defaultSize={{ width: '30%' }} />);
      expect(wrapper.instance().getSize().width).toEqual('30%');
    });
  });
});
