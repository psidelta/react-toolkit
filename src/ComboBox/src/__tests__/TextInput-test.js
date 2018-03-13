import React from 'react';
import { mount } from 'enzyme';
import TextInput from '../TextInput';

describe('TextInput', () => {
  describe('placeholder', () => {
    it('should be rendered when there is no value', () => {
      const wrapper = mount(
        <TextInput placeholder={<div id="placeholder"> Hello world </div>} />
      );

      expect(wrapper.find('#placeholder')).to.have.length(1);
      wrapper.setProps({ value: 30 });
      expect(wrapper.find('#placeholder')).to.have.length(0);
    });
  });

  describe('throttle', () => {
    it('calls onChange after throttle ms', () => {
      const clock = sinon.useFakeTimers();
      const onChange = sinon.spy();
      const wrapper = mount(
        <TextInput throttle={300} value={'hello world'} onChange={onChange} />
      );
      expect(onChange.called).to.be.false;
      wrapper.instance().handleChange({
        target: {
          value: 'hello'
        }
      });
      expect(onChange.called).to.be.false;
      clock.tick(300);
      expect(onChange.called).to.be.true;
      clock.restore();
    });
  });
});
