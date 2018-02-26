import React from 'react';
import { mount, shallow } from 'enzyme';
import Combo from '../ComboBox';
import List from '../List';

describe('expanded/collapse', () => {
  describe('controled', () => {
    it('should be used insted of state', () => {
      const wrapper = shallow(<Combo defaultExpanded={false} expanded />);
      expect(wrapper.instance().getExpanded()).to.be.true;
    });
    it("doesn't change when a change is triggered", () => {
      const wrapper = shallow(<Combo defaultExpanded={false} expanded />);
      wrapper.instance().setExpanded(false);
      expect(wrapper.instance().getExpanded()).to.be.true;
      // state should not be changed
      expect(wrapper.state().expanded).to.be.false;
    });
  });

  describe('uncontroled', () => {
    it('changes state when changeExpanded is called', () => {
      const wrapper = shallow(<Combo defaultExpanded={false} />);
      expect(wrapper.instance().getExpanded()).to.be.false;
      wrapper.instance().setExpanded(true);
      expect(wrapper.instance().getExpanded()).to.be.true;
    });
  });

  describe('onExpandedChange', () => {
    it('is called when expanded changes', () => {
      const onExpandedChange = sinon.spy();
      const wrapper = shallow(<Combo onExpandedChange={onExpandedChange} />);
      expect(onExpandedChange.called).to.be.false;
      wrapper.instance().setExpanded(true);
      expect(onExpandedChange.called).to.be.true;
    });
  });

  describe('list', () => {
    it('renders only when expanded is true', () => {
      const wrapper = mount(<Combo expanded />);
      expect(wrapper.find(List)).to.have.length(1);
      wrapper.setProps({ expanded: false });
      expect(wrapper.find(List)).to.have.length(0);
    });
  });

  describe('expandOnClick', () => {
    it('changes expanded from false to true when combo is clicked', () => {
      const wrapper = mount(<Combo defaultExpanded={false} />);
      expect(wrapper.find(List)).to.have.length(0);
      wrapper.simulate('click');
      expect(wrapper.find(List)).to.have.length(1);
    });
  });

  describe('collapseOnEscape', () => {
    it('changes expanded from false to true when combo is clicked', () => {
      const wrapper = mount(<Combo defaultExpanded />);
      expect(wrapper.find(List)).to.have.length(1);
      wrapper.simulate('keyDown', { key: 'Escape' });
      expect(wrapper.find(List)).to.have.length(0);
    });
  });

  describe('onCollapse', () => {
    it('is called when exapnded changes from true to false', () => {
      const onCollapse = sinon.spy();
      const wrapper = mount(<Combo onCollapse={onCollapse} defaultExpanded />);
      wrapper.instance().collapse();
      expect(onCollapse.called).to.be.true;
    });
  });

  describe('onExpand', () => {
    it('is called when exapnded changes from true to false', () => {
      const onExpand = sinon.spy();
      const wrapper = mount(
        <Combo onExpand={onExpand} defaultExpanded={false} />
      );
      wrapper.instance().expand();
      expect(onExpand.called).to.be.true;
    });
  });

  describe('expandOnTextChange', () => {
    it('expands list when text is changed by input', () => {
      const wrapper = mount(<Combo defaultExpanded={false} />);
      expect(wrapper.find(List)).to.have.length(0);
      wrapper.instance().handleTextChange('hello');
      expect(wrapper.find(List)).to.have.length(1);
    });
  });

  describe('ArrowUp and ArrowDown', () => {
    it('expands list if collapseed', () => {
      const wrapper = shallow(<Combo defaultExpanded={false} />);
      wrapper.instance().navigateToNextItem();
      expect(wrapper.instance().getExpanded()).to.be.true;
    });
  });

  describe('collapseOnSelectWithEnter', () => {
    it('collapses when there is an active item selected, list is expanded', () => {
      const wrapper = shallow(
        <Combo
          collapseOnSelectWithEnter
          enableListNavigation
          defaultExpanded
          enableNavigation
          multiple={false}
          defaultActiveItem={1}
          dataSource={[{ id: 1 }]}
        />
      );
      wrapper.simulate('keyDown', { key: 'Enter' });
      expect(wrapper.instance().getExpanded()).to.be.false;
    });
  });
});
