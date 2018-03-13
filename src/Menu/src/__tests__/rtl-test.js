import React from 'react';
import { mount } from 'enzyme';
import Menu from '../Menu';
import Expander from '../Expander';

const ROOT_CLASS = Menu.defaultProps.rootClassName;

describe('rtl', () => {
  const items = [
    { label: 'test', items: [{ label: 'submenu item' }] },
    { label: 'test2' }
  ];
  const wrapper = mount(<Menu rtl items={items} />);

  it('rtl prop is passed to expender', () => {
    expect(wrapper.find(Expander).prop('rtl')).to.be.true;
  });

  it(`should have ${ROOT_CLASS}--rtl className`, () => {
    expect(
      wrapper
        .find(`.${ROOT_CLASS}`)
        .at(0)
        .hasClass(`${ROOT_CLASS}--rtl`)
    ).to.be.true;
  });
});
