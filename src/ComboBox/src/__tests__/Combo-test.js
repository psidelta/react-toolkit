import React from 'react';
import { shallow, mount } from 'enzyme';

import Combo from '../ComboBox';
import Item from '../List/Item';
import Tag from '../Tag';
import TextInput from '../TextInput';

const ROOT_CLASS = Combo.defaultProps.rootClassName;

const dataSource = [
  { id: 1, label: 'test1' },
  { id: 2, label: 'test2' },
  { id: 3, label: 'test3' }
];

describe('Combo.js', () => {
  it('should create instance of Combo', () => {
    const wrapper = shallow(<Combo dataSource={[]} />);
    expect(wrapper.instance()).to.be.instanceOf(Combo);
  });

  describe('searchable', () => {
    it('TextInput is rendered also when it is false', () => {
      const wrapper = mount(<Combo searchable />);
      expect(wrapper.find(TextInput)).to.have.length(1);
      wrapper.setProps({ searchable: false });
      expect(wrapper.find(TextInput)).to.have.length(1);
    });
  });

  describe('onTagClick', () => {
    it('should be called when tag is clicked', () => {
      const onTagClick = sinon.spy();
      const wrapper = mount(
        <Combo
          multiple
          value={[1, 2]}
          onTagClick={onTagClick}
          dataSource={dataSource}
        />
      );
      wrapper
        .find(Tag)
        .at(0)
        .simulate('click');
      expect(onTagClick.called).to.be.true;
    });
  });

  describe('collapseOnSelect', () => {
    it('collapses list when an item is selected', () => {
      const wrapper = shallow(
        <Combo collapseOnSelect defaultExpanded dataSource={dataSource} />
      );
      expect(wrapper.instance().getExpanded()).to.be.true;
      wrapper.instance().setValue(3);
      expect(wrapper.instance().getExpanded()).to.be.false;
    });
  });

  describe('clearTextOnBlur', () => {
    it('clears search text when combo recives blur', () => {
      const wrapper = shallow(
        <Combo clearTextOnBlur defaultText="hello world" />
      );
      expect(wrapper.instance().getText()).to.equal('hello world');
      wrapper.simulate('blur');
      expect(wrapper.instance().getText()).to.be.null;
    });
  });

  describe('maxValueLength', () => {
    it('restricts the multiple value length', () => {
      const wrapper = shallow(
        <Combo
          maxValueLength={2}
          multiple
          dataSource={dataSource}
          defaultValue={[1, 2]}
        />
      );
      wrapper.instance().selectItem(3);
      expect(wrapper.instance().getValue()).toEqual([1, 2]);
    });
  });

  describe('keepTagTextOnRemove', () => {
    it('when a tag is removed with backspace, text changes to the tags value, and the tag is removed', () => {
      const wrapper = mount(
        <Combo
          maxValueLength={2}
          multiple
          keepTagTextOnRemove
          dataSource={dataSource}
          defaultValue={[1]}
        />
      );
      wrapper.instance().focus();
      wrapper
        .find(TextInput)
        .at(0)
        .simulate('keyDown', {
          key: 'Backspace'
        });
      expect(wrapper.instance().getText()).to.equal('test1');
      expect(wrapper.instance().getValue()).to.be.null;
    });
  });

  describe('tagActiveStyle', () => {
    it('adds style on active tag', () => {
      const wrapper = mount(
        <Combo
          tagActiveStyle={{ color: 'red' }}
          multiple
          activeTag={2}
          value={[1, 2]}
          dataSource={[{ id: 1, label: 'hello' }, { id: 2, label: 'hello 2' }]}
        />
      );
      expect(
        wrapper
          .find(`.${ROOT_CLASS}__value__tag`)
          .at(1)
          .props().style.color
      ).to.equal('red');
    });
  });

  describe('onItemClick', () => {
    it('is called when item is clicked', () => {
      const onItemClick = sinon.spy();
      const wrapper = mount(
        <Combo
          expanded
          dataSource={[{ id: 1, label: 'hello world' }]}
          onItemClick={onItemClick}
        />
      );
      wrapper
        .find(Item)
        .at(0)
        .simulate('click');
      expect(onItemClick.called).to.be.true;
      expect(onItemClick.args[0][0].item.id).to.equal(1);
    });
  });

  describe('renderInput', () => {
    it('mutates original input comp props', () => {
      const wrapper = mount(
        <Combo
          searchable
          text="hello world"
          renderInput={({ domProps }) => {
            domProps.id = 'cutomInputId';
          }}
        />
      );
      expect(wrapper.find('#cutomInputId')).to.have.length(1);
    });
    it('renders a custom input', () => {
      const wrapper = mount(
        <Combo
          searchable
          text="hello world"
          renderInput={({ domProps }) => {
            return <input id="customId" />;
          }}
        />
      );
      expect(wrapper.find('#customId')).to.have.length(1);
    });
  });

  describe('renderList', () => {
    it('renders a custom list', () => {
      const wrapper = mount(
        <Combo
          expanded
          dataSource={[{ id: 1 }]}
          renderList={() => {
            return <div id="customList"> hello world </div>;
          }}
        />
      );
      expect(wrapper.find('#customList')).to.have.length(1);
    });
    it('mutated props are applid on default list', () => {
      const wrapper = mount(
        <Combo
          expanded
          dataSource={[{ id: 1 }]}
          renderList={({ domProps }) => {
            domProps.id = 'customListId';
          }}
        />
      );
      expect(wrapper.find('#customListId')).to.have.length(1);
    });
  });
});
