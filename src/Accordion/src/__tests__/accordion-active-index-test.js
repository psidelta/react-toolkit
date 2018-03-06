import React from 'react';

import Accordion, { CLASS_NAME } from '../Accordion';
import { shallow, mount } from 'enzyme';

describe('Accordion Callbacks', () => {
  let accordionInnerContent;
  beforeEach(() => {
    accordionInnerContent = [
      <div key={1} tabTitle={<div data-test="tab1">Tab 1</div>}>Tab 1</div>,
      <div key={2} tabTitle={<div data-test="tab2">Tab 2</div>}>Tab 2</div>,
      <div key={3} tabTitle="tab3">Tab 3</div>
    ];
  });

  it('should set defaultActiveIndex to a valid number', () => {
    const component = shallow(
      <Accordion data-test="self" defaultActiveIndex={1} transition={false}>
        {accordionInnerContent}
      </Accordion>
    );

    const activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([1]);
  });

  it('should assume defaultActiveIndex={0} by default', () => {
    const component = shallow(
      <Accordion data-test="self" transition={false}>
        {accordionInnerContent}
      </Accordion>
    );

    const activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([0]);
  });

  it('should prioritise activeIndex over defaultActiveIndex', () => {
    const component = shallow(
      <Accordion
        data-test="self"
        activeIndex={1}
        defaultActiveIndex={2}
        transition={false}
      >
        {accordionInnerContent}
      </Accordion>
    );

    const activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([1]);
  });

  it('should allow setting null defaultActiveIndex', () => {
    const component = shallow(
      <Accordion data-test="self" defaultActiveIndex={null} transition={false}>
        {accordionInnerContent}
      </Accordion>
    );

    const activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([]);
  });

  it('should reset to zero a negative defaultActiveIndex', () => {
    const component = shallow(
      <Accordion data-test="self" defaultActiveIndex={-1} transition={false}>
        {accordionInnerContent}
      </Accordion>
    );

    const activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([0]);
  });

  it('should reset to index of last tab a defaultActiveIndex bigger than the number of tabs', () => {
    const component = shallow(
      <Accordion data-test="self" defaultActiveIndex={99} transition={false}>
        {accordionInnerContent}
      </Accordion>
    );
    const activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([2]); //as there are 3 tabs, with 0 based index
  });

  it('should allow setting [] defaultActiveIndex', () => {
    const component = shallow(
      <Accordion data-test="self" defaultActiveIndex={[]} transition={false}>
        {accordionInnerContent}
      </Accordion>
    );

    const activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([]);
  });

  it('should allow setting [] activeIndex', () => {
    const component = shallow(
      <Accordion data-test="self" activeIndex={[]} transition={false}>
        {accordionInnerContent}
      </Accordion>
    );

    const activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([]);
  });

  it('should allow controlling active tabs by active index', () => {
    let activeTabs;
    const component = shallow(
      <Accordion data-test="self" activeIndex={[]} transition={false}>
        {accordionInnerContent}
      </Accordion>
    );

    activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([]);

    component.setProps({
      activeIndex: [0]
    });

    activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([0]);

    component.setProps({
      activeIndex: [2]
    });
    activeTabs = component.instance().getActiveTabs();
    expect(activeTabs).toEqual([2]);
  });

  it('should call onActivate while controlled component', () => {
    let activeTabs, onActivateSpy = sinon.spy();
    const component = mount(
      <Accordion
        onActivate={onActivateSpy}
        data-test="self"
        activeIndex={[]}
        transition={false}
      >
        {accordionInnerContent}
      </Accordion>
    );

    component.find('[data-test="tab2"]').simulate('click');

    expect(onActivateSpy).to.have.been.calledOnce;

    component.setProps({
      multiExpand: true
    });

    component.find('[data-test="tab1"]').simulate('click');
    expect(onActivateSpy).to.have.been.calledTwice;
  });
});
