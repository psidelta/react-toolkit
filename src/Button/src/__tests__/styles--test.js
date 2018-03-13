import React from 'react';
import Button from '../Button';
import { mount } from 'enzyme';

describe('style', () => {
  it('adds pressedStyle when button is pressed', () => {
    const wrapper = mount(
      <Button id="button" pressed pressedStyle={{ color: 'red' }} />
    );
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
  it('adds focusedStyle when button is focused', () => {
    const wrapper = mount(
      <Button id="button" pressed focusedStyle={{ color: 'red' }} />
    );
    wrapper.setState({ focused: true });
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
  it('adds overStyle when button is over', () => {
    const wrapper = mount(
      <Button id="button" pressed overStyle={{ color: 'red' }} />
    );
    wrapper.setState({ mouseOver: true });
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
  it('adds activeStyle when button is active', () => {
    const wrapper = mount(
      <Button id="button" pressed activeStyle={{ color: 'red' }} />
    );
    wrapper.setState({ active: true });
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
});
