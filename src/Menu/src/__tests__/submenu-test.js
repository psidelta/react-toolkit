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
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import { mount, shallow } from 'enzyme';

describe('submenu', () => {
  xit('should render on mouseEnter', () => {
    const items = [{ label: 'test', items: [{ label: 'submenu item' }] }];
    const wrapper = mount(<Menu items={items} />);

    expect(wrapper.instance().subMenu).to.not.exist;
    wrapper.find(MenuItem).first().simulate('mouseEnter');

    expect(wrapper.instance().subMenu).to.exist;
    expect(wrapper.instance().subMenu.props.subMenu).to.be.true;
  });
});
