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

describe('resize hande props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  describe('showHandlesOnOver', () => {
    it('renders handles all the time when false', () => {
      wrapper.setProps({ showHandlesOnOver: false });
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).toHaveLength(8);
    });

    it('renders handles only when it hovered', () => {
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).toHaveLength(0);
      wrapper.setProps({ showHandlesOnOver: true });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).toHaveLength(8);
    });
  });

  describe('renderResizeHandle', () => {
    it('should be called for each handle', () => {
      const renderResizeHandle = jest.fn();
      wrapper.setProps({ renderResizeHandle });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      // make sure
      expect(renderResizeHandle.mock.calls).toHaveLength(8);
    });
    xit('renders handles with mutated props', done => {
      const renderResizeHandle = domProps => {
        domProps.className = domProps.className + ' custom-handle-className';
      };
      wrapper.setProps({ renderResizeHandle });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      setTimeout(() => {
        expect(wrapper.find('.custom-handle-className')).toHaveLength(8);
        done();
      }, 50);
    });
    it('renders what it returns', () => {
      const renderResizeHandle = domProps => {
        return <div className="customReturn" />;
      };
      wrapper.setProps({ renderResizeHandle });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');

      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).toHaveLength(0);
      expect(wrapper.find('.customReturn')).toHaveLength(8);
    });
  });

  describe('resizeHandles', () => {
    it('renders only specified handles', () => {
      wrapper.setProps({ resizeHandles: ['t', 'r'] });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).toHaveLength(2);
      expect(wrapper.find(`.${ROOT_CLASS}__handle--t`)).toHaveLength(1);
      expect(wrapper.find(`.${ROOT_CLASS}__handle--r`)).toHaveLength(1);
    });
  });

  describe('handleWidth', () => {
    it('sets handle size', () => {
      wrapper.setProps({ resizable: true, handleWidth: 22 });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      expect(
        wrapper
          .find(`.${ROOT_CLASS}__handle--l`)
          .first()
          .props().style.width
      ).toEqual(22);
      expect(
        wrapper
          .find(`.${ROOT_CLASS}__handle--t`)
          .first()
          .props().style.height
      ).toEqual(22);
    });
  });

  describe('handleStyle', () => {
    it('adds style on handlers', () => {
      wrapper.setProps({
        resizable: true,
        handleStyle: {
          color: 'blue'
        }
      });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');

      expect(
        wrapper
          .find(`.${ROOT_CLASS}__handle`)
          .first()
          .props().style.color
      ).toEqual('blue');
    });
  });
});
