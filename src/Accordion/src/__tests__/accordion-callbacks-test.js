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
    onActivateSpy = sinon.spy();
    tab1OnExpandSpy = sinon.spy();
    tab1OnCollapseSpy = sinon.spy();
    tab2OnExpandSpy = sinon.spy();
    onExpandSpy = sinon.spy();
    onCollapseSpy = sinon.spy();

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
        <div ref="lockedTab" locked tabTitle="locked tab">Tab 3</div>
        <div disabled tabTitle="disabled tab">Tab 4</div>

      </Accordion>
    );
    instance = component.instance();
  });

  it('should call onActivate with number on expand/collapse', () => {
    expect(
      onActivateSpy.callCount,
      'on mount should not call onActivate'
    ).to.equal(0);
    instance.expandAt(1);
    expect(
      onActivateSpy.callCount,
      'after expandAt should be called once'
    ).to.equal(1);
    expect(onActivateSpy).to.have.been.calledWith(1);
    instance.expandAt(0);
    expect(onActivateSpy).to.have.been.calledWith(0);
  });

  it('should call onActivate with array on expand/collapse', () => {
    component.setProps({ multiExpand: true });
    instance.expandAt(1);
    expect(onActivateSpy).to.have.been.calledWith([0, 1]);
  });

  it('should call individual callbacks for each tab as well as accordion callbacks', () => {
    instance.expandAt(1);
    expect(onExpandSpy, 'onExpandSpy').to.have.been.calledOnce;
    expect(onExpandSpy).to.have.been.calledWith(1);
    expect(onCollapseSpy, 'onCollapseSpy').to.have.been.calledOnce;
    expect(onCollapseSpy).to.have.been.calledWith(0);

    expect(tab1OnCollapseSpy).to.have.been.calledOnce;
    expect(tab2OnExpandSpy).to.have.been.calledOnce;

    instance.expandAt(0);
    expect(onExpandSpy).to.have.been.calledWith(0);
    expect(onCollapseSpy).to.have.been.calledWith(1);
    expect(tab1OnExpandSpy).to.have.been.calledOnce;
  });

  it('should recalculate tab titles onResize', () => {
    const tabTitles = instance.tabTitles;
    const tabTitle1 = tabTitles[0];
    const tabTitle2 = tabTitles[1];
    const tabTitle3 = tabTitles[2];

    const stub1 = sinon.stub(tabTitle1, 'onResize');
    const stub2 = sinon.stub(tabTitle2, 'onResize');
    const stub3 = sinon.stub(tabTitle3, 'onResize');

    instance.onResize();

    expect(stub1).to.have.been.calledOnce;
    expect(stub2).to.have.been.calledOnce;
    expect(stub3).to.have.been.calledOnce;

    stub1.restore();
    stub2.restore();
    stub3.restore();
  });
});
