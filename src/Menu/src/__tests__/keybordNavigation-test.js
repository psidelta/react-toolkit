import React from 'react';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import { mount } from 'enzyme';
import getSubMenu from './getSubMenu';

const ROOT_CLASS = Menu.defaultProps.rootClassName;

describe('keyboard navigation', () => {
  describe('className', () => {
    it('--focused className is applied to the focused item', () => {
      const items = [
        { label: 'test', items: [{ label: 'submenu item' }] },
        { label: 'test2' }
      ];
      const wrapper = mount(<Menu enableKeyboardNavigation items={items} />);

      wrapper.setState({ focusedItem: 0 });
      expect(
        wrapper
          .find(MenuItem)
          .first()
          .find('tr')
          .hasClass(`${ROOT_CLASS}__row--focused`)
      ).to.be.true;

      wrapper.setState({ focusedItem: 1 });
      expect(
        wrapper
          .find(MenuItem)
          .at(1)
          .find('tr')
          .hasClass(`${ROOT_CLASS}__row--focused`)
      ).to.be.true;

      wrapper.setState({ focusedItem: 0 });
      expect(
        wrapper
          .find(MenuItem)
          .first()
          .find('tr')
          .hasClass(`${ROOT_CLASS}__row--focused`)
      ).to.be.true;
    });
  });

  describe('navigation with arrows', () => {
    it('simple navigation', () => {
      const items = [
        {
          label: 'test',
          items: [{ label: 'submenu item' }]
        },
        { label: 'test2' },
        { label: 'test3' },
        { label: 'test5' },
        { label: 'test4' }
      ];
      const wrapper = mount(
        <Menu enableKeyboardNavigation defaultFocusedItem={0} items={items} />
      );

      // 1 down
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.state('focusedItem')).to.equal(1);

      // 2 down
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.state('focusedItem')).to.equal(3);

      // 3 up
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      expect(wrapper.state('focusedItem')).to.equal(0);
    });

    it('should not excede min limit - focusedItem cannot be < 0', () => {
      const items = [
        { label: 'test', items: [{ label: 'submenu item' }] },
        { label: 'test2' },
        { label: 'test2' },
        { label: 'test3' }
      ];
      const min = 0;
      const wrapper = mount(
        <Menu enableKeyboardNavigation defaultFocusedItem={0} items={items} />
      );

      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      expect(wrapper.state('focusedItem')).to.equal(min);

      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      expect(wrapper.state('focusedItem')).to.equal(min);

      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      wrapper.simulate('keyDown', { key: 'ArrowUp' });
      expect(wrapper.state('focusedItem')).to.equal(min);
    });

    it('should not excede max limit, focusedItem cannot be < items.length - 1', () => {
      const items = [
        { label: 'test', items: [{ label: 'submenu item' }] },
        { label: 'test2' },
        { label: 'test2' },
        { label: 'test3' }
      ];
      const max = items.length - 1;
      const wrapper = mount(
        <Menu enableKeyboardNavigation defaultFocusedItem={max} items={items} />
      );

      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.state('focusedItem')).to.equal(max);

      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.state('focusedItem')).to.equal(max);

      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      wrapper.simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.state('focusedItem')).to.equal(max);
    });
  });

  describe('submenu', () => {
    let items;
    let wrapper;
    let submenu;

    beforeEach(() => {
      items = [
        {
          label: 'test',
          items: [
            { label: 'submenu item' },
            { label: 'submenu item 2' },
            { label: 'submenu item 3' }
          ]
        },
        { label: 'test2' }
      ];
      wrapper = mount(
        <Menu defaultFocusedItem={0} enableKeyboardNavigation items={items} />
      );

      // open submenu
      wrapper.simulate('keyDown', { key: 'ArrowRight' });

      // get a reference to submenu
      submenu = getSubMenu(wrapper);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should open on arrow right and close on left', () => {
      wrapper.simulate('keyDown', { key: 'ArrowLeft' });
      expect(getSubMenu(wrapper)).to.be.null;
    });

    it('should be navigable', () => {
      const items = [
        {
          label: 'test',
          items: [
            { label: 'submenu item' },
            { label: 'submenu item 2' },
            { label: 'submenu item 3' }
          ]
        },
        { label: 'test2' }
      ];

      const wrapper = mount(
        <Menu defaultFocusedItem={0} enableKeyboardNavigation items={items} />
      );

      wrapper.simulate('keyDown', { key: 'ArrowRight' });
      wrapper.simulate('keyDown', { key: 'ArrowRight' });
      const submenu = wrapper.find(Menu);

      // first item should be focused
      expect(submenu.get(0).state.focusedItem).to.equal(0);

      // // navigate arrow down
      submenu.get(0).handleArrowDown();
      expect(submenu.get(0).state.focusedItem).to.equal(1);

      // // navigate arrow up
      submenu.get(0).handleArrowUp();
      expect(submenu.get(0).state.focusedItem).to.equal(0);
    });

    xit('should close itself on arrow left', () => {
      // shoud close it self on arrow left
      submenu.simulate('keyDown', { key: 'ArrowLeft' });
      submenu = getSubMenu(wrapper);
      expect(submenu).to.be.null;
    });

    xit('should close itself on arrow left, after it was navigated up and down', () => {
      // navigate
      submenu.simulate('keyDown', { key: 'ArrowDown' });
      submenu.simulate('keyDown', { key: 'ArrowUp' });

      // close
      submenu.simulate('keyDown', { key: 'ArrowLeft' });
      submenu = getSubMenu(wrapper);
      expect(submenu).to.be.null;
    });

    it('first item should have --focused className', () => {
      const items = [
        {
          label: 'test',
          items: [
            { label: 'submenu item' },
            { label: 'submenu item 2' },
            { label: 'submenu item 3' }
          ]
        },
        { label: 'test2' }
      ];
      const wrapper = mount(
        <Menu defaultFocusedItem={0} enableKeyboardNavigation items={items} />
      );
      expect(
        wrapper
          .find(MenuItem)
          .first()
          .find(`.${ROOT_CLASS}__row--focused`)
      ).to.have.length(1);
    });

    xit('submenu opened with keyboard, is closed on mouseleave', done => {
      submenu.simulate('mouseEnter');
      submenu.simulate('mouseLeave');

      // needs to pass 100ms before it unmounts
      setTimeout(() => {
        // submenu should be null
        submenu = getSubMenu(wrapper);
        expect(submenu).to.be.null;

        done();
      }, 20);
    });

    xit(`
        - menu has focus, and a focusedItem
        - hover over a menu item
        - submenu opens
        - if arrow right is pressed on the same menu item, the first item should
        be focused
      `, () => {
      const items = [
        {
          label: 'test',
          items: [
            { label: 'submenu item' },
            { label: 'submenu item 2' },
            { label: 'submenu item 3' }
          ]
        },
        { label: 'test2' }
      ];
      const wrapper = mount(
        <Menu defaultFocusedItem={0} enableKeyboardNavigation items={items} />
      );

      // open by mouse enter
      wrapper
        .find(MenuItem)
        .first()
        .simulate('mouseEnter');
      submenu = getSubMenu(wrapper);

      expect(submenu).to.exist;

      // submenu should have focusedIndex null
      expect(submenu.get(0).state.focusedItem).to.be.null;

      // simulate open on same menu
      wrapper.simulate('keyDown', { key: 'ArrowRight' });
      expect(submenu.get(0).state.focusedItem).to.equal(0);
    });
  });

  describe('rtl', () => {
    let items;
    let wrapper;
    let submenu;

    beforeEach(() => {
      items = [
        {
          label: 'test',
          items: [
            { label: 'submenu item' },
            { label: 'submenu item 2' },
            { label: 'submenu item 3' }
          ]
        },
        { label: 'test2' }
      ];
      wrapper = mount(
        <Menu
          rtl
          defaultFocusedItem={0}
          enableKeyboardNavigation
          items={items}
        />
      );

      // get a reference to submenu
      submenu = getSubMenu(wrapper);
    });

    xit('left opens and right closes submenu', () => {
      submenu = getSubMenu(wrapper);
      expect(submenu).to.be.null;

      wrapper.simulate('keyDown', { key: 'ArrowLeft' });
      submenu = getSubMenu(wrapper);
      expect(submenu).to.exist;

      submenu.simulate('keyDown', { key: 'ArrowRight' });
      submenu = getSubMenu(wrapper);
      expect(submenu).to.be.null;
    });
  });
});
