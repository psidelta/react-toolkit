/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import Menu, { CLASS_NAME } from '../Menu';
import MenuItem from '../MenuItem';
import Expander from '../Expander';
import { mount } from 'enzyme';

describe('props passed from items[0] to MenuItem', () => {
  describe('item.style', () => {
    it('item.style gets applied on tr', () => {
      const items = [{ label: 'test', style: { color: 'item color' } }];
      const wrapper = mount(<Menu items={items} />);
      expect(wrapper.find(MenuItem).find('tr').prop('style').color).to.equal(
        items[0].style.color
      );
    });

    // overwrite is already tested in cellStyle
    it(
      'item.overStyle is added on tr when menuitem receives mouseEnter',
      () => {
        const items = [{ label: 'test', overStyle: { color: 'over color' } }];
        const wrapper = mount(<Menu items={items} />);
        const menuItem = wrapper.find(MenuItem).first().find('tr');
        expect(menuItem.prop('style').color).to.not.equal(
          items[0].overStyle.color
        );
        menuItem.simulate('mouseEnter');
        expect(menuItem.prop('style').color).to.equal(items[0].overStyle.color);
      }
    );

    it(
      'item.overClassName is added on tr when menuitem receives mouseEnter',
      () => {
        const items = [{ label: 'test', overClassName: 'over-className' }];
        const wrapper = mount(<Menu items={items} />);
        const menuItem = wrapper.find(MenuItem).first().find('tr');
        expect(menuItem.prop('className')).to.not.contain('over-className');
        menuItem.simulate('mouseEnter');
        expect(menuItem.prop('className')).to.contain('over-className');
      }
    );

    it('item.overStyle global.overStyle', () => {
      const items = [{ label: 'test', overStyle: { color: 'over color' } }];
      const wrapper = mount(
        <Menu overStyle={{ color: 'global over color' }} items={items} />
      );
      const menuItem = wrapper.find(MenuItem).first().find('tr');

      menuItem.simulate('mouseEnter');
      expect(menuItem.prop('style').color).to.equal(items[0].overStyle.color);
    });

    xit('item.disabled is added on tr if item.disabled is true', () => {
      const items = [
        {
          label: 'test',
          disabled: true,
          disabledStyle: { color: 'disabled color' }
        }
      ];
      const wrapper = mount(<Menu items={items} />);
      const menuItem = wrapper.find(MenuItem).first().find('tr');
      expect(menuItem.prop('style').color).to.not.equal(
        items[0].disabled.color
      );
    });

    xit('item.disabledStyle global.disabledStyle', () => {
      const items = [
        {
          label: 'test',
          disabled: true,
          disabledStyle: { color: 'over color' }
        }
      ];
      const wrapper = mount(
        <Menu disabledStyle={{ color: 'global over color' }} items={items} />
      );
      const menuItem = wrapper.find(MenuItem).first().find('tr');

      menuItem.simulate('mouseEnter');
      expect(menuItem.prop('style').color).to.equal(
        items[0].disabledStyle.color
      );
    });

    it('item.cellStyle is added on td', () => {
      const items = [{ label: 'test', cellStyle: { color: 'cell color' } }];
      const wrapper = mount(<Menu items={items} />);
      expect(
        wrapper.find(MenuItem).first().find('td').first().prop('style').color
      ).to.equal(items[0].cellStyle.color);
    });

    it('item.expanderStyle style should be aplied on expander', () => {
      const items = [
        {
          label: 'test',
          expanderStyle: { color: 'expander color' },
          items: [{ label: 'test1' }]
        }
      ];
      const wrapper = mount(<Menu items={items} />);
      expect(wrapper.find(Expander).prop('style').color).to.equal(
        items[0].expanderStyle.color
      );
    });

    xit('should apply submenuMaxHeight property', () => {
      const items = [
        { label: 'main menu', items: [{ label: 'submenu item' }] }
      ];
      const wrapper = mount(<Menu items={items} submenuMaxHeight={77} />);

      wrapper.find(MenuItem).first().simulate('mouseEnter');

      // setTimeout(() => {
      const menu = wrapper.find(Menu).at(1);
      expect(menu.props().maxHeight).to.equal(77);
      //testing the rendered html
      expect(menu.html().indexOf('max-height: 77px')).not.to.equal(-1);
      //   done()
      // })
    });
  });

  describe('item.expander', () => {
    it('should render custom expander', () => {
      const items = [
        {
          label: 'test',
          expander() {
            return <div id="itemExpander" />;
          },
          items: [{ label: 'test 2' }]
        }
      ];
      const wrapper = mount(<Menu items={items} />);
      expect(wrapper.find('#itemExpander')).to.have.length(1);
    });
    it('item.expander should overwrite global expander prop', () => {
      const items = [
        {
          label: 'test',
          expander() {
            return <div id="itemExpander" />;
          },
          items: [{ label: 'test 2' }]
        }
      ];
      const wrapper = mount(
        <Menu items={items} expander={() => <div id="globalExapnder" />} />
      );

      expect(wrapper.find('#itemExpander')).to.have.length(1);
    });
  });
});
