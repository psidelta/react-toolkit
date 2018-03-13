import React from 'react';
import { findDOMNode } from 'react-dom';
import Accordion from '../Accordion';
import { shallow, mount } from 'enzyme';
import { render } from '../../../common/testUtils';

describe('Accordion Methods - Expanding and Collapsing', () => {
  const classOfExpandedTab =
    '.zippy-react-toolkit-accordion__tab-title--expanded';

  /* test method using DOM */
  it('should only expand valid tabs', () => {
    const accordionInstance = render(
      <Accordion transition={false}>
        <div disabled tabTitle="disabled tab">
          content
        </div>
        <div tabTitle="Enabled tab">content</div>
        <div tabProps={{ disabled: true }} tabTitle="Second disabled tab">
          content
        </div>
      </Accordion>
    );
    accordionInstance.expandAll();

    const accordionNode = findDOMNode(accordionInstance);
    const expandedNodes = [
      ...accordionNode.querySelectorAll(
        '.zippy-react-toolkit-accordion__tab-title--expanded'
      )
    ];

    expect(expandedNodes.length).toEqual(1);
    expect(expandedNodes[0].innerHTML.indexOf('Enabled tab')).not.toBe(-1);

    accordionInstance.unmount();
  });

  it('should auto expand a locked tab', () => {
    const accordionInstance = render(
      <Accordion transition={false} multiExpand defaultActiveIndex={[0, 1, 2]}>
        <div tabTitle="unlocked tab">Locked tab 1</div>
        <div tabTitle="Enabled tab">Second unlocked tab...</div>
        <div tabTitle="Second disabled tab" tabProps={{ locked: true }}>
          Locked through props tab
        </div>
      </Accordion>
    );
    const accordionNode = findDOMNode(accordionInstance);
    const expandedNodes = [
      ...accordionNode.querySelectorAll(
        '.zippy-react-toolkit-accordion__tab-title--expanded'
      )
    ];
    expect(expandedNodes.length).toEqual(3);
    accordionInstance.unmount();
  });

  it('should expand automatically at first tab if no defaultActiveIndex is set', () => {
    const component = render(
      <Accordion transition={false}>
        <div tabTitle="Expanded tab">Tab 1</div>
        <div tabTitle="second tab">Tab 2</div>
      </Accordion>
    );

    const accordionNode = findDOMNode(component);
    const expandedNodes = [
      ...accordionNode.querySelectorAll(classOfExpandedTab)
    ];

    expect(expandedNodes.length).toEqual(1);
    expect(expandedNodes[0].innerHTML.indexOf('Expanded tab')).not.toBe(-1);
    component.unmount();
  });

  it('should expand automatically at defaultActiveIndex', () => {
    const component = mount(
      <Accordion defaultActiveIndex={1} transition={false}>
        <div tabTitle="valid tab">Tab 1</div>
        <div tabTitle="this tab will be expanded by default">Tab 2</div>
      </Accordion>
    );
    expect(component.instance().getActiveTabs()).toEqual([1]);
  });

  it('should skip expanding disabled tabs', () => {
    const component = mount(
      <Accordion transition={false} multiExpand>
        <div tabProps={{ disabled: true }} tabTitle="valid tab">
          Tab 1
        </div>
        <div tabTitle="another valid tab">Tab 2</div>
        <div disabled tabTitle="this is the default tab">
          Tab 3
        </div>
      </Accordion>
    );
    component.instance().expandAll();
    expect(component.instance().getActiveTabs()).toEqual([1]);
  });

  it('should expand at specific index', () => {
    const component = mount(
      <Accordion transition={false}>
        <div>tab 1</div>
        <div>tab 2</div>
      </Accordion>
    );
    const instance = component.instance();
    instance.expandAt(1);
    expect(instance.getActiveTabs()).toEqual([1]);
  });

  it('should not be able to expand a locked tab', () => {
    const accordionInstance = render(
      <Accordion transition={false}>
        <div tabTitle="enabled tab">enabled tab 1</div>
        <div tabTitle="Enabled tab">enabled tab 2...</div>
        <div tabTitle="Second disabled tab" tabProps={{ locked: true }}>
          locked tab
        </div>
      </Accordion>
    );
    accordionInstance.expandAt(2);
    const accordionNode = findDOMNode(accordionInstance);
    const expandedNodes = [
      ...accordionNode.querySelectorAll(
        '.zippy-react-toolkit-accordion__tab-title--expanded'
      )
    ];
    expect(expandedNodes[0].innerHTML.indexOf('locked tab')).toBe(-1);
    expect(expandedNodes[0].innerHTML.indexOf('enabled tab')).not.toBe(-1);
    accordionInstance.unmount();
  });

  it('should not expand a disabled through props tab', () => {
    const component = mount(
      <Accordion transition={false}>
        <div>tab 1</div>
        <div tabProps={{ disabled: true }}>tab 2</div>
      </Accordion>
    );
    const instance = component.instance();
    instance.expandAt(1);
    expect(instance.getActiveTabs()).not.toContain(1);
  });

  it('should not expand a disabled tab', () => {
    const component = mount(
      <Accordion transition={false}>
        <div>tab 1</div>
        <div disabled>tab 2</div>
      </Accordion>
    );
    const instance = component.instance();
    instance.expandAt(1);
    expect(instance.getActiveTabs()).not.toContain(1);
  });

  it('should collapse when expanding another tab', () => {
    const component = mount(
      <Accordion transition={false}>
        <div>tab 1</div>
        <div>tab 2</div>
      </Accordion>
    );
    const instance = component.instance();
    expect(instance.getActiveTabs()).toEqual([0]);
    instance.expandAt(1);
    expect(instance.getActiveTabs()).toEqual([1]);
  });

  it('should not collapse when expanding another tab and multiexpand', () => {
    const component = mount(
      <Accordion transition={false} multiExpand>
        <div>tab 1</div>
        <div>tab 2</div>
      </Accordion>
    );
    const instance = component.instance();
    expect(instance.getActiveTabs()).toEqual([0]);
    instance.expandAt(1);
    expect(instance.getActiveTabs()).toEqual([0, 1]);
  });

  it('should collapse all when collapsible', () => {
    const component = mount(
      <Accordion collapsible multiExpand transition={false}>
        <div>tab 1</div>
        <div>tab 2</div>
      </Accordion>
    );
    const instance = component.instance();
    instance.expandAll();
    expect(instance.getActiveTabs()).toEqual([0, 1]);
    instance.collapseAll();
    expect(instance.getActiveTabs()).toEqual([]);
  });

  it('should not collapse all when not collapsible', () => {
    const component = mount(
      <Accordion multiExpand transition={false}>
        <div>tab 1</div>
        <div>tab 2</div>
      </Accordion>
    );
    const instance = component.instance();
    instance.expandAll();
    expect(instance.getActiveTabs()).toEqual([0, 1]);
    instance.collapseAll();
    //first tab should collapse, but the second should remain uncollapsed
    expect(instance.getActiveTabs()).toEqual([1]);
  });
});
