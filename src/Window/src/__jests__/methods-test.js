/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';

describe('methods', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  describe('maximize', () => {
    it('updates maximized state', () => {
      wrapper.setProps({ maximizable: true });
      expect(wrapper.instance().getMaximized()).toBe(false);
      wrapper.instance().maximize();
      expect(wrapper.instance().getMaximized()).toBe(true);
    });
    it('calls onMaximize change', () => {
      const onMaximizeChange = jest.fn();
      wrapper.setProps({ maximizable: true, onMaximizeChange });
      expect(onMaximizeChange).toHaveBeenCalledTimes(0);
      wrapper.instance().maximize();
      expect(onMaximizeChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('restore', () => {
    it('updates maximized state', () => {
      wrapper.setState({ maximized: true });
      wrapper.setProps({ maximizable: true });
      expect(wrapper.instance().getMaximized()).toBe(true);
      wrapper.instance().restore();
      expect(wrapper.instance().getMaximized()).toBe(false);
    });
    it('calls onMaximize change', () => {
      const onMaximizeChange = jest.fn();
      wrapper.setProps({ maximizable: true, onMaximizeChange });
      expect(onMaximizeChange).toHaveBeenCalledTimes(0);
      wrapper.instance().restore();
      expect(onMaximizeChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('center', () => {
    it('should trigger onCenteredChange', () => {
      const onCenteredChange = jest.fn();
      wrapper.setProps({ onCenteredChange });
      wrapper.instance().center();
      expect(onCenteredChange).toHaveBeenCalled();
    });
    it('should change state', () => {
      wrapper.instance().center();
      expect(wrapper.instance().getCentered()).toBe(true);
    });
  });
});
