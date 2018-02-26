import React from 'react';
import { shallow, mount } from 'enzyme';
import Combo from '../ComboBox';
import TextInput from '../TextInput';

const dataSource = [
  {
    label: 'test',
    id: 1
  },
  {
    label: 'test2',
    id: 2
  }
];

describe('disabled', () => {
  it('activeItem cannot change', () => {
    const onActiveItemChange = sinon.spy();
    const wrapper = shallow(
      <Combo
        dataSource={dataSource}
        defaultActiveItem={1}
        disabled
        onActiveItemChange={onActiveItemChange}
      />
    );
    const instance = wrapper.instance();
    expect(instance.getActiveItem()).to.equal(1);
    instance.setActiveItem(2);
    expect(instance.getActiveItem()).to.equal(1);
    expect(onActiveItemChange.called).to.be.false;
  });
  it('search input is not rendered', () => {
    const wrapper = mount(<Combo searchable disabled />);
    expect(wrapper.find(TextInput)).to.have.length(0);
  });
  it('activetag cannot change', () => {
    const onActiveTagChange = sinon.spy();
    const wrapper = shallow(
      <Combo
        dataSource={dataSource}
        defaultActiveTag={1}
        disabled
        onActiveTagChange={onActiveTagChange}
      />
    );
    const instance = wrapper.instance();
    expect(instance.getActiveTag()).to.equal(1);
    instance.setActiveTag(2);
    expect(instance.getActiveTag()).to.equal(1);
    expect(onActiveTagChange.called).to.be.false;
  });
  it('value cannot be changed', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <Combo
        dataSource={dataSource}
        defaultValue={1}
        disabled
        onChange={onChange}
      />
    );
    const instance = wrapper.instance();
    expect(instance.getValue()).to.equal(1);
    instance.setValue(2);
    expect(instance.getValue()).to.equal(1);
    expect(onChange.called).to.be.false;
  });
  it('expanded cannot be changed', () => {
    const onExpandedChange = sinon.spy();
    const wrapper = shallow(
      <Combo
        dataSource={dataSource}
        defaultExpanded
        disabled
        onExpandedChange={onExpandedChange}
      />
    );
    const instance = wrapper.instance();
    expect(instance.getExpanded()).to.be.true;
    instance.setExpanded(false);
    expect(instance.getExpanded()).to.be.true;
    expect(onExpandedChange.called).to.be.false;
  });
});
