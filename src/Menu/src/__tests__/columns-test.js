import React from 'react';
import { mount } from 'enzyme';

import Menu from '../Menu';
import MenuItem from '../MenuItem';
import MenuCell from '../MenuItem/MenuItemCell';

const ROOT_CLASS_NAME = Menu.defaultProps.rootClassName;

describe('columns', () => {
  it('default should render 1 column', () => {
    const items = [{ label: 'test' }];
    const wrapper = mount(<Menu items={items} />);
    expect(wrapper.find(MenuItem).find(MenuCell)).to.have.length(1);
  });

  it('renders custom columns', () => {
    const items = [{ label: 'label1', name: 'name2' }];
    const columns = ['label', 'name'];
    const wrapper = mount(<Menu items={items} columns={columns} />);

    expect(wrapper.find(MenuItem).find(MenuCell)).to.have.length(2);
  });

  it('should use column.render when present', () => {
    const Flag = ({ name }) => {
      return <div>Flag for {name}</div>;
    };

    const items = [{ country: 'United States', shortName: 'usa' }];
    const columns = [
      'country',
      {
        name: 'shortName',
        render: item => <Flag country={item.shortName} />
      }
    ];
    const wrapper = mount(<Menu items={items} columns={columns} />);

    expect(wrapper.find(Flag)).to.have.length(1);
  });

  it('should add className', () => {
    const wrapper = mount(
      <Menu
        columns={[
          {
            name: 'label',
            className: 'custom-class-name' // should be applied on the TD
          }
        ]}
        items={[
          {
            label: 'Single Cell',
            cellClassName: 'a-cell-class-name',
            // should be applied on the TR
            className: 'xxx'
          }
        ]}
      />
    );

    const cell = wrapper.find(`.${ROOT_CLASS_NAME}__cell`);

    expect(cell.prop('className')).to.contain('custom-class-name');
    expect(cell.prop('className')).to.contain('a-cell-class-name');
    expect(wrapper.find('tr').prop('className')).to.contain('xxx');
  });
});
