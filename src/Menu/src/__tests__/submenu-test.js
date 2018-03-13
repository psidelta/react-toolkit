import React from 'react';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import { mount, shallow } from 'enzyme';

describe('submenu', () => {
  xit('should render on mouseEnter', () => {
    const items = [{ label: 'test', items: [{ label: 'submenu item' }] }];
    const wrapper = mount(<Menu items={items} />);

    expect(wrapper.instance().subMenu).to.not.exist;
    wrapper
      .find(MenuItem)
      .first()
      .simulate('mouseEnter');

    expect(wrapper.instance().subMenu).to.exist;
    expect(wrapper.instance().subMenu.props.subMenu).to.be.true;
  });
});
