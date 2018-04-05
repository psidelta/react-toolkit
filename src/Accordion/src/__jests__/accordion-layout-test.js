/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Accordion, { CLASS_NAME } from '../Accordion';
import { shallow, mount } from 'enzyme';

describe('Accordion Layout', () => {
  let component, instance;
  beforeEach(() => {
    component = mount(
      <Accordion transition={false}>
        <div tabTitle={<div data-test="tab1">Tab 1</div>}>Tab 1</div>
        <div tabTitle={<div data-test="tab2">Tab 2</div>}>Tab 2</div>
        <div tabTitle="tab3">Tab 3</div>
      </Accordion>
    );

    instance = component.instance();
  });

  it('should only have on tab expanded in single expand mode', () => {
    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([1]);
  });

  it('should have multiple tabs expanded in multi expand mode', () => {
    component.setProps({ multiExpand: true });
    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([0, 1]);
  });

  it('should handle switch between multi to single expand', () => {
    component.setProps({ multiExpand: true });
    component.find('[data-test="tab2"]').simulate('click');
    component.setProps({ multiExpand: false });
    const activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toHaveProperty('length', 1);
  });

  it('should not collapse last open tab in collapsible=false', () => {
    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([0]);
  });

  it('should collapse last open tab in collapsible=true', () => {
    component.setProps({ collapsible: true });
    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([]);
  });

  it('should support horizontal interaction', () => {
    component.setProps({ horizontal: true });
    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([1]);

    component.setProps({ collapsible: true });
    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([]);

    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([0]);
  });
});
