import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';

describe('renderToolBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  it('renders what it returns', () => {
    const renderToolBar = () => <div id="helloWorld" />;
    wrapper.setProps({ renderToolBar });
    expect(wrapper.find('#helloWorld')).to.have.length(1);
  });

  it('renders with mutated domProps', () => {
    const renderToolBar = domProps => {
      domProps.id = 'helloWorld';
    };
    wrapper.setProps({ renderToolBar });
    expect(wrapper.find('#helloWorld')).to.have.length(1);
  });
});
