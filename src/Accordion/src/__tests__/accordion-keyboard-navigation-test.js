import React from 'react';

import Accordion, { CLASS_NAME } from '../Accordion';
import { shallow, mount } from 'enzyme';

describe('Accordion Keyboard Navigation', () => {
  let component, instance;

  beforeEach(() => {
    component = mount(
      <Accordion data-test="self" transition={false}>

        <div tabTitle={<div data-test="tab1">Tab 1</div>}>Tab 1</div>
        <div tabTitle={<div data-test="tab2">Tab 2</div>}>Tab 2</div>
        <div tabTitle="tab3">Tab 3</div>

      </Accordion>
    );
    instance = component.instance();
  });

  describe('focusing', () => {
    it('should focus with focus event', () => {
      component.simulate('focus');
      expect(component.find('[data-test="self"]').prop('className')).to.contain(
        `${CLASS_NAME}--focused`
      );
    });

    xit('should focus on click on expanded tab', () => {
      component.find('[data-test="tab1"]').simulate('click');
      expect(component.find('[data-test="self"]').prop('className')).to.contain(
        `${CLASS_NAME}--focused`
      );
    });

    it('should focus on click when expanding tab', () => {
      component.find('[data-test="tab2"]').simulate('click');
      expect(component.find('[data-test="self"]').prop('className')).to.contain(
        `${CLASS_NAME}--focused`
      );
    });

    it('should have tab index set and configurable', () => {
      const self = component.find('[data-test="self"]');

      expect(component.find('[data-test="self"]').node).to.have.property(
        'tabIndex',
        0
      );
      const USER_TAB_INDEX = 32;
      component.setProps({
        tabIndex: USER_TAB_INDEX
      });
      expect(component.find('[data-test="self"]').node).to.have.property(
        'tabIndex',
        USER_TAB_INDEX
      );
    });
  });

  describe('navigation', () => {
    it('should navigate via ArrowUp and ArrowDown', () => {
      let activeTabs;
      component.simulate('focus');
      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: ' ' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([1]);

      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: ' ' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([2]);

      component.simulate('keyDown', { key: 'ArrowUp' });
      component.simulate('keyDown', { key: 'ArrowUp' });
      component.simulate('keyDown', { key: ' ' });

      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([0]);
    });

    it('should navigate via Home and End', () => {
      let activeTabs;
      component.simulate('focus');
      component.simulate('keyDown', { key: 'End' });
      component.simulate('keyDown', { key: ' ' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([2]);

      component.simulate('keyDown', { key: 'Home' });
      component.simulate('keyDown', { key: ' ' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([0]);
    });

    it('should expand via ArrowRight', () => {
      let activeTabs;
      component.simulate('focus');
      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: 'ArrowRight' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([1]);

      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: 'ArrowRight' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([2]);
    });

    it('should collapse via ArrowLeft', () => {
      let activeTabs;
      component.setProps({
        collapsible: true
      });
      component.simulate('focus');
      component.simulate('keyDown', { key: 'ArrowLeft' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([]);
      component.simulate('keyDown', { key: 'ArrowRight' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([0]);
    });

    it('should toggle via " " (space)', () => {
      let activeTabs;
      component.setProps({
        collapsible: true
      });
      component.simulate('focus');
      component.simulate('keyDown', { key: ' ' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([]);
      component.simulate('keyDown', { key: ' ' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([0]);
    });

    it('should support horizontal navigation', () => {
      component.setProps({
        horizontal: true
      });

      component.simulate('focus');
      component.simulate('keyDown', { key: 'ArrowRight' });
      component.simulate('keyDown', { key: ' ' });
      const activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([1]);
    });

    it('should ignore keyDown when not focused', () => {
      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: ' ' });
      const activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([0]);
    });
  });

  describe('handling onFocus, onBlur and onKeyDown outside', () => {
    it('should allow setting custom handlers while keeping navigation functionality', () => {
      const onFocusSpy = sinon.spy(),
        onBlurSpy = sinon.spy(),
        onKeyDownSpy = sinon.spy(),
        component = mount(
          <Accordion
            data-test="self"
            onFocus={onFocusSpy}
            onBlur={onBlurSpy}
            onKeyDown={onKeyDownSpy}
            transition={false}
          >

            <div tabTitle={<div data-test="tab1">Tab 1</div>}>Tab 1</div>
            <div tabTitle={<div data-test="tab2">Tab 2</div>}>Tab 2</div>
            <div tabTitle="tab3">Tab 3</div>

          </Accordion>
        );

      component.simulate('focus', {});
      component.simulate('keyDown', {});
      component.simulate('blur', {});

      expect(onFocusSpy).to.have.been.calledOnce;
      expect(onBlurSpy).to.have.been.calledOnce;
      expect(onKeyDownSpy).to.have.been.calledOnce;

      component.simulate('focus', {});
      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: ' ' });

      expect(onFocusSpy).to.have.been.calledTwice;
      expect(onKeyDownSpy.callCount).to.equal(3);

      const activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).to.deep.equal([1]);
    });
  });
});
