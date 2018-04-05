/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Accordion, { CLASS_NAME } from '../Accordion';
import { shallow, mount } from 'enzyme';

describe('Accordion Keyboard Navigation', () => {
  let component, instance;
  const accordion = (
    <Accordion activateOnFocus data-test="self" transition={false}>
      <div tabTitle={<div data-test="tab1">Tab 1</div>}>Tab 1</div>
      <div tabTitle={<div data-test="tab2">Tab 2</div>}>Tab 2</div>
      <div tabTitle="tab3">Tab 3</div>
    </Accordion>
  );

  beforeEach(() => {
    component = mount(accordion);
    instance = component.instance();
  });

  describe('focusing', () => {
    it('should focus with focus event', () => {
      component.simulate('focus');
      const self = component.find('div[data-test="self"]');
      expect(self.hasClass(`${CLASS_NAME}--focused`)).toBe(true);
    });

    it('should focus on click on a tab', () => {
      const tab2 = component.find('[data-test="tab2"]');

      tab2.simulate('click');

      const self = component.find('div[data-test="self"]');

      expect(self.props().className).toContain(`${CLASS_NAME}--focused`);
    });

    it('should have tab index set and configurable', () => {
      let domProps = component.find('div[data-test="self"]').props();

      expect(domProps).toHaveProperty('tabIndex', 0);

      const USER_TAB_INDEX = 32;
      component.setProps({
        tabIndex: USER_TAB_INDEX
      });

      domProps = component.find('div[data-test="self"]').props();
      expect(domProps).toHaveProperty('tabIndex', USER_TAB_INDEX);
    });
  });

  describe('navigation', () => {
    it('should navigate via ArrowUp and ArrowDown', () => {
      let activeTabs;
      component.simulate('focus');
      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: ' ' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([1]);

      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: ' ' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([2]);

      component.simulate('keyDown', { key: 'ArrowUp' });
      component.simulate('keyDown', { key: 'ArrowUp' });
      component.simulate('keyDown', { key: ' ' });

      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([0]);
    });

    it('should navigate via Home and End', () => {
      let activeTabs;
      const component = mount(
        <Accordion activateOnFocus data-test="self" transition={false}>
          <div tabTitle={<div data-test="tab1">Tab 1</div>}>Tab 1</div>
          <div tabTitle={<div data-test="tab2">Tab 2</div>}>Tab 2</div>
          <div tabTitle="tab3">Tab 3</div>
        </Accordion>
      );
      component.simulate('focus');
      component.simulate('keyDown', { key: 'End' });
      component.simulate('keyDown', { key: 'Enter' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([2]);

      component.simulate('keyDown', { key: 'Home' });
      component.simulate('keyDown', { key: 'Enter' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([0]);
    });

    it('should expand via ArrowRight', () => {
      let activeTabs;
      component.simulate('focus');
      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: 'ArrowRight' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([1]);

      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: 'ArrowRight' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([2]);
    });

    it('should collapse via ArrowLeft', () => {
      let activeTabs;
      component.setProps({
        collapsible: true
      });
      component.simulate('focus');
      component.simulate('keyDown', { key: 'ArrowLeft' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([]);
      component.simulate('keyDown', { key: 'ArrowRight' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([0]);
    });

    it('should toggle via " " (space)', () => {
      const component = mount(
        <Accordion
          collapsible
          activateOnFocus
          data-test="self"
          transition={false}
        >
          <div tabTitle={<div data-test="tab1">Tab 1</div>}>Tab 1</div>
          <div tabTitle={<div data-test="tab2">Tab 2</div>}>Tab 2</div>
          <div tabTitle="tab3">Tab 3</div>
        </Accordion>
      );
      let activeTabs;
      component.simulate('focus');
      component.simulate('keyDown', { key: 'Enter' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([]);
      component.simulate('keyDown', { key: 'Enter' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([0]);
    });

    it('should support horizontal navigation', () => {
      const component = mount(
        <Accordion
          horizontal
          activateOnFocus
          data-test="self"
          transition={false}
        >
          <div tabTitle={<div data-test="tab1">Tab 1</div>}>Tab 1</div>
          <div tabTitle={<div data-test="tab2">Tab 2</div>}>Tab 2</div>
          <div tabTitle="tab3">Tab 3</div>
        </Accordion>
      );

      component.simulate('focus');
      component.simulate('keyDown', { key: 'ArrowRight' });
      component.simulate('keyDown', { key: ' ' });
      const activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([1]);
    });

    it('should ignore keyDown when not focused', () => {
      const component = mount(
        <Accordion activateOnFocus data-test="self" transition={false}>
          <div tabTitle={<div data-test="tab1">Tab 1</div>}>Tab 1</div>
          <div tabTitle={<div data-test="tab2">Tab 2</div>}>Tab 2</div>
          <div tabTitle="tab3">Tab 3</div>
        </Accordion>
      );
      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: ' ' });
      const activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([0]);
    });
  });

  describe('handling onFocus, onBlur and onKeyDown outside', () => {
    it('should allow setting custom handlers while keeping navigation functionality, and expand tab on arrowdown with activateOnFocus=true', () => {
      const onFocusSpy = jest.fn(),
        onBlurSpy = jest.fn(),
        onKeyDownSpy = jest.fn(),
        component = mount(
          <Accordion
            data-test="self"
            onFocus={onFocusSpy}
            onBlur={onBlurSpy}
            onKeyDown={onKeyDownSpy}
            transition={false}
            activateOnFocus={true}
          >
            <div tabTitle={<div data-test="tab1">Tab 1</div>}>Tab 1</div>
            <div tabTitle={<div data-test="tab2">Tab 2</div>}>Tab 2</div>
            <div tabTitle="tab3">Tab 3</div>
          </Accordion>
        );

      component.simulate('focus');
      component.simulate('keyDown');
      component.simulate('blur');

      expect(onFocusSpy).toHaveBeenCalledTimes(1);
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);

      component.simulate('focus', {});
      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: ' ' });

      expect(onFocusSpy).toHaveBeenCalledTimes(2);
      expect(onKeyDownSpy).toHaveBeenCalledTimes(3);

      const activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([1]);
    });
  });
});
