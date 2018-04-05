/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';
import Icon from '../../../common/Icon';
const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('maximize props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window maximizable />);
  });

  describe('maximizable', () => {
    it("doesn't render maximize tool when false", () => {
      wrapper.setProps({ maximizable: false });
      const icon = wrapper.find('.zippy-react-toolkit-window__maximized-icon');
      expect(icon.length).toBe(0);
    });
    it('renders Icon when true', () => {
      const icon = wrapper.find('.zippy-react-toolkit-window__maximized-icon');
      expect(icon.length).toBeGreaterThan(0);
    });
  });

  describe('maximized and defaultMaximized', () => {
    it('should render maximize icon when is maximized false', () => {
      wrapper.setProps({ maximized: false });
      const icon = wrapper.find('.zippy-react-toolkit-window__maximized-icon');
      expect(icon.length).toBeGreaterThan(0);
    });
    it('should render restore icon when maximized is true', () => {
      wrapper.setProps({ maximized: true });
      const icon = wrapper.find('.zippy-react-toolkit-window__restore-icon');
      expect(icon.length).toBeGreaterThan(0);
    });
    it('should have --maximized className when true', () => {
      wrapper.setProps({ maximized: true });
      expect(wrapper.find(`.${ROOT_CLASS}--maximized`).length).toBeGreaterThan(
        0
      );
    });
    it('should not change state when setMaximized is called', () => {
      wrapper.setProps({ maximized: true });
      wrapper.instance().setMaximized(false);
      expect(wrapper.instance().getMaximized()).toBe(true);
    });
    it('getMaximized should return maximized state and not this.state.maximized', () => {
      wrapper.setProps({ maximized: true });
      wrapper.setState({ maximized: false });
      expect(wrapper.instance().getMaximized()).toBe(true);
    });
    it('uses defaultMaximized when maximized is not set', () => {
      const wrapper = mount(<Window maximizable defaultMaximized />);
      expect(wrapper.instance().getMaximized()).toBe(true);
    });
    it('should not set position and size props on style when true', () => {
      wrapper.setProps({
        maximized: true,
        size: { width: 100, height: 100 },
        position: { top: 100, left: 200 }
      });

      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.top).toBe(undefined);
      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.left).toBe(undefined);
      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.width).toBe(
        undefined
      );
      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.height).toBe(
        undefined
      );
    });
    it('should not render resize handles when it is maximized', () => {
      wrapper.setProps({ maximized: true });
      wrapper.find(`.${ROOT_CLASS}`).simulate('mouseEnter');
      expect(wrapper.find(`.${ROOT_CLASS}__handle`)).toHaveLength(0);
    });
  });

  describe('maximizeOnDoubleClick', () => {
    it('should trigger onMaximizeChange', () => {
      const onMaximizeChange = jest.fn();
      wrapper.setProps({ maximizeOnDoubleClick: true, onMaximizeChange });
      wrapper.find(`.${ROOT_CLASS}__title-bar`).simulate('doubleClick');
      expect(onMaximizeChange).toHaveBeenCalled();
      expect(onMaximizeChange.mock.calls[0][0]).toBe(true);
    });
  });

  describe('maximizedIcon', () => {
    it('renders jsx', () => {
      wrapper.setProps({
        maximized: false,
        maximizeIcon: <div id="maximizeicon" />
      });
      expect(wrapper.find('#maximizeicon')).toHaveLength(1);
    });
  });

  describe('restoreIcon', () => {
    it('renders jsx', () => {
      wrapper.setProps({
        maximized: true,
        restoreIcon: <div id="restoreIcon" />
      });
      expect(wrapper.find('#restoreIcon')).toHaveLength(1);
    });
  });

  describe('events', () => {
    describe('onMaximizeChange', () => {
      it('should be called when setMaximized is called', () => {
        const onMaximizeChange = jest.fn();
        wrapper.setProps({ onMaximizeChange });
        wrapper.instance().setMaximized(true);
        expect(onMaximizeChange).toHaveBeenCalled();
        expect(onMaximizeChange.mock.calls[0][0]).toBe(true);
      });
      it('should trigger onMaximizeChange when maximizeicon is clicked', () => {
        const onMaximizeChange = jest.fn();
        wrapper.setProps({ onMaximizeChange, maximized: false });
        const icon = wrapper
          .find('.zippy-react-toolkit-window__maximized-icon')
          .first();
        icon.simulate('click');
        expect(onMaximizeChange).toHaveBeenCalled();
      });
      it('should trigger onMaximizeChange when restoreIcon is clicked', () => {
        const onMaximizeChange = jest.fn();
        wrapper.setProps({ onMaximizeChange, maximized: true });
        const restoreIcon = wrapper
          .find('.zippy-react-toolkit-window__restore-icon')
          .first();
        restoreIcon.simulate('click');
        expect(onMaximizeChange).toHaveBeenCalledTimes(1);
      });
    });
    it('should call onMaximize when maximized changes from false to true', () => {
      const onMaximize = jest.fn();
      wrapper.setProps({
        onMaximize,
        maximized: false
      });
      expect(onMaximize).toHaveBeenCalledTimes(0);
      wrapper.instance().setMaximized(true);
      expect(onMaximize).toHaveBeenCalledTimes(1);
    });
    it('should call onRestore when maximized changes from true to false', () => {
      const onRestore = jest.fn();
      wrapper.setProps({
        onRestore,
        maximized: true
      });
      expect(onRestore).toHaveBeenCalledTimes(0);
      wrapper.instance().setMaximized(false);
      expect(onRestore).toHaveBeenCalledTimes(1);
    });
  });
});
