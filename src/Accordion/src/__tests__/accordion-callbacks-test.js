import React from 'react';

import Accordion, { CLASS_NAME } from '../Accordion';
import { shallow, mount } from 'enzyme';

describe('Accordion Callbacks', () => {
  let component,
    instance,
    onActivateSpy,
    onExpandSpy,
    onCollapseSpy,
    tab1OnExpandSpy,
    tab1OnCollapseSpy,
    tab2OnExpandSpy;

  beforeEach(() => {
    onActivateSpy = jest.fn();
    tab1OnExpandSpy = jest.fn();
    tab1OnCollapseSpy = jest.fn();
    tab2OnExpandSpy = jest.fn();
    onExpandSpy = jest.fn();
    onCollapseSpy = jest.fn();

    component = mount(
      <Accordion
        onExpand={onExpandSpy}
        onCollapse={onCollapseSpy}
        onActivate={onActivateSpy}
        transition={false}
      >
        <div
          tabProps={{
            onExpand: tab1OnExpandSpy,
            onCollapse: tab1OnCollapseSpy
          }}
          tabTitle="valid tab"
        >
          Tab 1
        </div>
        <div
          tabProps={{
            onExpand: tab2OnExpandSpy
          }}
          tabTitle="another valid tab"
        >
          Tab 2
        </div>
        <div ref="lockedTab" locked tabTitle="locked tab">
          Tab 3
        </div>
        <div disabled tabTitle="disabled tab">
          Tab 4
        </div>
      </Accordion>
    );
    instance = component.instance();
  });

  it('should call onActivate with number on expand/collapse', () => {
    //should not activate on mount
    expect(onActivateSpy).toHaveBeenCalledTimes(0);
    instance.expandAt(1);
    expect(onActivateSpy).toHaveBeenCalledTimes(1);
    expect(onActivateSpy).toHaveBeenCalledWith(1);
    instance.expandAt(0);
    expect(onActivateSpy).toHaveBeenCalledWith(0);
  });

  it('should call onActivate with array on expand/collapse', () => {
    component.setProps({ multiExpand: true });
    instance.expandAt(1);
    expect(onActivateSpy).toHaveBeenCalledWith([0, 1]);
  });

  it('should call individual callbacks for each tab as well as accordion callbacks', () => {
    instance.expandAt(1);
    expect(onExpandSpy).toHaveBeenCalledTimes(1);
    expect(onExpandSpy).toHaveBeenCalledWith(1);
    expect(onCollapseSpy).toHaveBeenCalledTimes(1);
    expect(onCollapseSpy).toHaveBeenCalledWith(0);

    expect(tab1OnCollapseSpy).toHaveBeenCalledTimes(1);
    expect(tab2OnExpandSpy).toHaveBeenCalledTimes(1);

    instance.expandAt(0);
    expect(onExpandSpy).toHaveBeenCalledWith(0);
    expect(onCollapseSpy).toHaveBeenCalledWith(1);
    expect(tab1OnExpandSpy).toHaveBeenCalledTimes(1);
  });

  it('should recalculate tab titles onResize', () => {
    const tabTitles = instance.tabTitles;
    const tabTitle1 = tabTitles[0];
    const tabTitle2 = tabTitles[1];
    const tabTitle3 = tabTitles[2];

    const onResize1 = jest.spyOn(tabTitle1, 'onResize');
    const onResize2 = jest.spyOn(tabTitle2, 'onResize');
    const onResize3 = jest.spyOn(tabTitle3, 'onResize');

    instance.onResize();

    expect(onResize1).toHaveBeenCalledTimes(1);
    expect(onResize2).toHaveBeenCalledTimes(1);
    expect(onResize3).toHaveBeenCalledTimes(1);
  });
});
