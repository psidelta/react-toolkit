import React from 'react';
import { mount, shallow } from 'enzyme';
import Combo from '../ComboBox';
import TextInput from '../TextInput';

describe('activeItem', () => {
  it('should work controlled and uncontrolled behaviour of active tag', () => {
    const onActiveItemChange = sinon.spy();
    const wrapper = mount(
      <Combo defaultActiveItem={20} onActiveItemChange={onActiveItemChange} />
    );
    expect(wrapper.instance().getActiveItem()).to.equal(20);
    expect(onActiveItemChange.called).to.be.false;
    wrapper.instance().setActiveItem(30);
    expect(onActiveItemChange.called).to.be.true;
    expect(onActiveItemChange.args[0][0]).to.equal(30);
    expect(wrapper.instance().getActiveItem()).to.equal(30);
    wrapper.setProps({ activeItem: 25 });
    expect(wrapper.instance().getActiveItem()).to.equal(25);
    wrapper.instance().setActiveItem(30);
    expect(wrapper.instance().getActiveItem()).to.equal(25);
  });

  it('ArrowDown it should make first item active if the list is open and there is no active item', () => {
    const dataSource = [
      { id: 1, label: 'test1' },
      { id: 2, label: 'test2' },
      { id: 3, label: 'test3' }
    ];
    const wrapper = shallow(
      <Combo dataSource={dataSource} expanded defaultActiveItem={null} />
    );
    wrapper.simulate('keyDown', { key: 'ArrowDown' });
    expect(wrapper.instance().getActiveItem()).to.equal(1);
  });

  it('ArrowUp it should make first item active if the list is open and there is no active item', () => {
    const dataSource = [
      { id: 1, label: 'test1' },
      { id: 2, label: 'test2' },
      { id: 3, label: 'test3' }
    ];
    const wrapper = shallow(
      <Combo dataSource={dataSource} expanded defaultActiveItem={null} />
    );
    wrapper.simulate('keyDown', { key: 'ArrowUp' });
    expect(wrapper.instance().getActiveItem()).to.equal(3);
  });

  it('ArrowDown navigates to next item', () => {
    const dataSource = [
      { id: 1, label: 'test1' },
      { id: 2, label: 'test2' },
      { id: 3, label: 'test3' }
    ];
    const wrapper = shallow(
      <Combo dataSource={dataSource} expanded defaultActiveItem={1} />
    );
    wrapper.simulate('keyDown', { key: 'ArrowDown' });
    expect(wrapper.instance().getActiveItem()).to.equal(2);
  });

  it('ArrowUp navigates to previous item', () => {
    const dataSource = [
      { id: 1, label: 'test1' },
      { id: 2, label: 'test2' },
      { id: 3, label: 'test3' }
    ];
    const wrapper = shallow(
      <Combo dataSource={dataSource} expanded defaultActiveItem={2} />
    );
    wrapper.simulate('keyDown', { key: 'ArrowUp' });
    expect(wrapper.instance().getActiveItem()).to.equal(1);
  });

  it('highlightFirst selects first item when none is selected', () => {
    const dataSource = [
      { id: 1, label: 'test1' },
      { id: 2, label: 'test2' },
      { id: 3, label: 'test3' }
    ];
    const wrapper = shallow(
      <Combo dataSource={dataSource} expanded={false} highlightFirst={false} />
    );
    expect(wrapper.instance().getActiveItem()).to.be.null;
    wrapper.setProps({ expanded: true });
    expect(wrapper.instance().getActiveItem()).to.be.null;
    wrapper.setProps({ expanded: false, highlightFirst: true });
    expect(wrapper.instance().getActiveItem()).to.be.null;
    wrapper.setProps({ expanded: true });
    expect(wrapper.instance().getActiveItem()).to.equal(1);
  });

  it('selects the active item with Entery key press only when the list is expanded', () => {
    const dataSource = [
      { id: 1, label: 'test1' },
      { id: 2, label: 'test2' },
      { id: 3, label: 'test3' }
    ];
    const wrapper = shallow(
      <Combo dataSource={dataSource} expanded={false} activeItem={2} />
    );
    const instance = wrapper.instance();
    expect(instance.getValue()).to.be.null;
    wrapper.simulate('keyDown', { key: 'Enter' });
    expect(instance.getValue()).to.be.null;
    wrapper.setProps({ expanded: true });
    wrapper.simulate('keyDown', { key: 'Enter' });
    expect(instance.getValue()).to.equal(2);
  });
});
