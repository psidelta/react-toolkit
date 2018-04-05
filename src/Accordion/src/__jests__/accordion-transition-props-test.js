/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Accordion, { CLASS_NAME } from '../Accordion';
import AccordionTabTitle, {
  CLASS_NAME as TITLE_CLASS_NAME
} from '../AccordionTabTitle';
import { shallow, mount } from 'enzyme';

describe('Accordion transition props', () => {
  let component,
    instance,
    raf = cb => cb();

  beforeEach(() => {
    component = mount(
      <Accordion raf={raf}>
        <div tabTitle={<div data-test="tab1">Tab 1</div>}>Tab 1</div>
        <div tabTitle={<div data-test="tab2">Tab 2</div>}>Tab 2</div>
        <div tabTitle={<div data-test="tab3">Tab 3</div>}>Tab 3</div>
      </Accordion>
    );

    instance = component.instance();
  });

  it('should transition on expand in single mode', () => {
    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([1]);
  });

  it('should transition on expand in multi mode', () => {
    component.setProps({
      multiExpand: true
    });
    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([0, 1]);
  });

  it('should transition to fully collapsed then expand', () => {
    component.setProps({
      collapsible: true
    });

    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([]);
    instance.tabContainers[0].onTransitionEnd();

    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([1]);
    instance.tabContainers[1].onTransitionEnd();

    component.setProps({
      multiExpand: true
    });

    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([]);
    instance.tabContainers[1].onTransitionEnd();

    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([0]);
    instance.tabContainers[0].onTransitionEnd();

    component.setProps({
      horizontal: true
    });

    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([]);
    instance.tabContainers[0].onTransitionEnd();

    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([1]);
    instance.tabContainers[1].onTransitionEnd();

    component.setProps({
      multiExpand: false
    });

    component.find('[data-test="tab2"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([]);
    instance.tabContainers[1].onTransitionEnd();

    component.find('[data-test="tab1"]').simulate('click');
    expect(instance.getActiveTabs()).toEqual([0]);
    instance.tabContainers[0].onTransitionEnd();
  });
});
