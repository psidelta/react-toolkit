import React from 'react';
import { mount } from 'enzyme';

import Menu from '../Menu';
import '../../style/index.scss';

const ROOT_CLASS = Menu.defaultProps.rootClassName;

describe('visible', () => {
  it(`should have ${ROOT_CLASS}--hidden className`, () => {
    const component = mount(
      <Menu visible={false} items={[{ label: 'test' }]} />
    );

    const menu = component.find('.zippy-react-toolkit-menu');

    expect(
      component
        .find('.zippy-react-toolkit-menu')
        .hasClass(`${ROOT_CLASS}--hidden`)
    ).toBe(true);
  });

  xit('visible=false should have computed style of visibility = hidden', () => {
    const component = mount(
      <Menu visible={false} items={[{ label: 'test' }]} />
    );
    const instance = component.instance();
    expect(getComputedStyle(instance).visibility).toBeCalled('hidden');
  });

  xit('visible=false should have computed style of visibility = true', () => {
    const component = mount(
      <Menu visible={false} items={[{ label: 'test' }]} />
    );
    const instance = component.instance();

    expect(getComputedStyle(instance).visibility).toBe('visible');
  });
});
