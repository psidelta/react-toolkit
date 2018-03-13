import React from 'react';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import { mount, shallow } from 'enzyme';
import getSubMenu from './getSubMenu';

describe('click events', () => {
  describe('onClick', () => {
    it('should work on direct children', () => {
      const items = [{ label: 'test' }];
      const onClick = sinon.spy();
      const wrapper = mount(<Menu onClick={onClick} items={items} />);

      wrapper
        .find(MenuItem)
        .first()
        .simulate('click');

      expect(onClick.called).to.be.true;
      expect(onClick.args[0]).to.have.length(3);
      expect(onClick.args[0][1].index).to.be.equal(0);
    });

    xit('should not be called when a submenu item had been clicked', () => {
      const items = [{ label: 'test', items: [{ label: 'submenu item' }] }];
      const onClick = sinon.spy();
      const wrapper = mount(<Menu items={items} onClick={onClick} />);

      wrapper
        .find(MenuItem)
        .first()
        .simulate('mouseEnter');

      const subMenu = getSubMenu(wrapper);

      expect(subMenu).to.exist;
      subMenu.find(MenuItem).simulate('click');

      expect(onClick.called).to.be.false;
    });
  });

  describe('onChildClick', () => {
    xit('should be called only from items from submenus', () => {
      const items = [{ label: 'test', items: [{ label: 'submenu item' }] }];
      const onClick = sinon.spy();
      const onChildClick = sinon.spy();
      const wrapper = mount(
        <Menu items={items} onClick={onClick} onChildClick={onChildClick} />
      );

      wrapper
        .find(MenuItem)
        .first()
        .simulate('mouseEnter');

      const subMenu = getSubMenu(wrapper);

      expect(subMenu).to.exist;
      subMenu.find(MenuItem).simulate('click');

      expect(onClick.called).to.be.false;
      expect(onChildClick.calledOnce).to.be.true;
    });
  });

  describe('item.onClick', () => {
    it('should be called', () => {
      const onClick = sinon.spy();
      const items = [{ label: 'test', onClick }];
      const wrapper = mount(<Menu items={items} />);
      wrapper
        .find(MenuItem)
        .first()
        .simulate('click');
      expect(onClick.called).to.be.true;
    });
  });
});
