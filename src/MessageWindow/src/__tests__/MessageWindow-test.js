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
      const onDismiss = sinon.spy();
      wrapper.setProps({ onDismiss, type: 'info', dismissOnButtonClick: true });
      wrapper.find(OkButton).first().simulate('click');
      expect(onDismiss.called).to.be.true;
    });
    it('calls onDismiss on yesButton click', () => {
      const onDismiss = sinon.spy();
      wrapper.setProps({
        onDismiss,
        type: 'question',
        dismissOnButtonClick: true
      });
      wrapper.find(YesButton).first().simulate('click');
      expect(onDismiss.called).to.be.true;
    });
    it('calls onDismiss on noButton click', () => {
      const onDismiss = sinon.spy();
      wrapper.setProps({
        onDismiss,
        type: 'question',
        dismissOnButtonClick: true
      });
      wrapper.find(NoButton).first().simulate('click');
      expect(onDismiss.called).to.be.true;
    });
    it('calls onDismiss on cancelButton click', () => {
      const onDismiss = sinon.spy();
      wrapper.setProps({
        onDismiss,
        type: 'yesNoCancel',
        dismissOnButtonClick: true
      });
      wrapper.find(CancelButton).first().simulate('click');
      expect(onDismiss.called).to.be.true;
    });
  });

  describe('opacity', () => {
    it('it is added to inline style', () => {
      wrapper.setProps({ opacity: 0.5 });
      const test = wrapper
        .find('.zippy-react-toolkit-message-window')
        .first()
        .props().style.opacity;
      expect(test).to.equal(0.5);
    });
  });

  describe('type info', () => {
    it('renders correct icon and buttons', () => {
      wrapper.setProps({ type: 'info' });
      expect(wrapper.find(OkButton)).to.have.length(1);
      expect(wrapper.find(InfoIcon)).to.have.length(1);
    });
  });

  describe('type question', () => {
    it('renders correct icon and buttons', () => {
      wrapper.setProps({ type: 'question' });
      expect(wrapper.find(YesButton)).to.have.length(1);
      expect(wrapper.find(NoButton)).to.have.length(1);
      expect(wrapper.find(QuestionIcon)).to.have.length(1);
    });
  });

  describe('type error', () => {
    it('renders correct icon and buttons', () => {
      wrapper.setProps({ type: 'error' });
      expect(wrapper.find(OkButton)).to.have.length(1);
      expect(wrapper.find(ErrorIcon)).to.have.length(1);
    });
  });
});
