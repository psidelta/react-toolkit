import React from 'react';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import { shallow, mount } from 'enzyme';
import getSubMenu from './getSubMenu';

const ROOT_CLASS = Menu.defaultProps.rootClassName;

describe('disabled', () => {
  it('should not call onClick', () => {
    const items = [{ label: 'test', disabled: true }];
    const onClick = sinon.spy();
    const wrapper = mount(<Menu onClick={onClick} items={items} />);

    wrapper
      .find(MenuItem)
      .first()
      .simulate('click');
    expect(onClick.called).to.be.false;
  });

  xit('should not call onChildClick', () => {
    let subMenu;
    const items = [
      {
        label: 'test',
        items: [
          {
            label: 'submenu item',
            disabled: true
          }
        ]
      }
    ];
    const onChildClick = sinon.spy();
    const wrapper = mount(<Menu onChildClick={onChildClick} items={items} />);

    // open submenu
    wrapper
      .find(MenuItem)
      .first()
      .simulate('mouseEnter');
    subMenu = getSubMenu(wrapper);
    expect(subMenu).to.exist;

    subMenu
      .find(MenuItem)
      .first()
      .simulate('click');

    expect(onChildClick.called).to.be.false;
  });

  it('should not trigger onClick when Enter key is pressed on focused item', () => {
    let subMenu;
    const onClick = sinon.spy();
    const items = [
      {
        label: 'test',
        disabled: true,
        items: [
          {
            label: 'submenu item',
            disabled: true
          }
        ]
      }
    ];
    const wrapper = mount(
      <Menu onClick={onClick} enableKeyboardNavigation items={items} />
    );

    wrapper
      .find(MenuItem)
      .first()
      .simulate('keyPress', { key: 'Enter' });
    expect(onClick.called).to.be.false;
  });

  xit('should apply disabled style if provided', () => {
    const disabledStyle = {
      background: 'red',
      fontSize: 40
    };
    const items = [
      {
        disabled: true,
        disabledStyle: disabledStyle
      }
    ];
    const wrapper = mount(<Menu items={items} />);
    const appliedStyle = wrapper
      .find(MenuItem)
      .first()
      .find('tr')
      .props().style;
    expect(appliedStyle.background).to.equal('red');
    expect(appliedStyle.fontSize).to.equal(40);
  });

  xit('should apply disabled style with higher precedence if provided', () => {
    const itemDisabledStyle = {
      background: 'orange'
    };

    const disabledStyle = {
      background: 'red'
    };

    const items = [
      {
        disabled: true,
        disabledStyle: disabledStyle,
        itemDisabledStyle: itemDisabledStyle
      }
    ];

    const wrapper = mount(<Menu items={items} />);
    const appliedStyle = wrapper
      .find(MenuItem)
      .first()
      .find('tr')
      .props().style;

    expect(appliedStyle.background).to.equal('red');
  });

  it('adds --disabled className', () => {
    const wrapper = mount(<Menu items={[{ label: 'test', disabled: true }]} />);
    const test = wrapper
      .find(MenuItem)
      .find('tr')
      .hasClass(`${ROOT_CLASS}__row--disabled`);
    expect(test).to.be.true;
  });
});
