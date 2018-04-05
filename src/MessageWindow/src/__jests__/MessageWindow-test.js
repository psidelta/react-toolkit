/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import MessageWindow from '../MessageWindow';
import { shallow, mount } from 'enzyme';
import { OkButton, CancelButton, NoButton, YesButton } from '../Buttons';
import { QuestionIcon, WarningIcon, ErrorIcon, InfoIcon } from '../Icons';

describe('MessageWindow', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<MessageWindow />);
  });

  describe('dismissOnButtonClick true', () => {
    it('calls onDismiss on okButton click', () => {
      const onDismiss = jest.fn();
      wrapper.setProps({ onDismiss, type: 'info', dismissOnButtonClick: true });
      wrapper
        .find(OkButton)
        .first()
        .simulate('click');
      expect(onDismiss).toHaveBeenCalled();
    });
    it('calls onDismiss on yesButton click', () => {
      const onDismiss = jest.fn();
      wrapper.setProps({
        onDismiss,
        type: 'question',
        dismissOnButtonClick: true
      });
      wrapper
        .find(YesButton)
        .first()
        .simulate('click');
      expect(onDismiss).toHaveBeenCalled();
    });
    it('calls onDismiss on noButton click', () => {
      const onDismiss = jest.fn();
      wrapper.setProps({
        onDismiss,
        type: 'question',
        dismissOnButtonClick: true
      });
      wrapper
        .find(NoButton)
        .first()
        .simulate('click');
      expect(onDismiss).toHaveBeenCalled();
    });
    it('calls onDismiss on cancelButton click', () => {
      const onDismiss = jest.fn();
      wrapper.setProps({
        onDismiss,
        type: 'yesNoCancel',
        dismissOnButtonClick: true
      });
      wrapper
        .find(CancelButton)
        .first()
        .simulate('click');
      expect(onDismiss).toHaveBeenCalled();
    });
  });

  describe('opacity', () => {
    it('it is added to inline style', () => {
      wrapper.setProps({ opacity: 0.5 });
      const test = wrapper
        .find('.zippy-react-toolkit-message-window')
        .first()
        .props().style.opacity;
      expect(test).toEqual(0.5);
    });
  });

  describe('type info', () => {
    it('renders correct icon and buttons', () => {
      wrapper.setProps({ type: 'info' });
      expect(wrapper.find(OkButton)).toHaveLength(1);
      expect(wrapper.find(InfoIcon)).toHaveLength(1);
    });
  });

  describe('type question', () => {
    it('renders correct icon and buttons', () => {
      wrapper.setProps({ type: 'question' });
      expect(wrapper.find(YesButton)).toHaveLength(1);
      expect(wrapper.find(NoButton)).toHaveLength(1);
      expect(wrapper.find(QuestionIcon)).toHaveLength(1);
    });
  });

  describe('type error', () => {
    it('renders correct icon and buttons', () => {
      wrapper.setProps({ type: 'error' });
      expect(wrapper.find(OkButton)).toHaveLength(1);
      expect(wrapper.find(ErrorIcon)).toHaveLength(1);
    });
  });
});
