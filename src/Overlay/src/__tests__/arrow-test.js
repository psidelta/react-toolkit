import React from 'react';
import { mount } from 'enzyme';

import Overlay from '../Overlay';

describe('arrow', () => {
  describe('arrowStyle', () => {
    it('should be used as inline style', () => {
      const wrapper = mount(<Overlay arrowStyle={{ color: 'red' }} />);
      wrapper.setState({ arrowConfig: {} });
      expect(
        wrapper
          .find('.react-overlay__arrow')
          .at(0)
          .props().style.color
      ).to.equal('red');
    });
  });
  describe('arrowClassName', () => {
    it('should be used as inline style', () => {
      const wrapper = mount(<Overlay arrowClassName="customArrow" />);
      wrapper.setState({ arrowConfig: {} });
      expect(wrapper.find('.customArrow')).to.have.length(1);
    });
  });
  describe('border', () => {
    it('should be added', () => {
      const wrapper = mount(<Overlay border="1px solid red" />);
      wrapper.setState({ arrowConfig: {} });
      expect(
        wrapper
          .find('.react-overlay__arrow')
          .at(0)
          .props().style.border
      ).to.equal('1px solid red');
    });
  });
  describe('arrow', () => {
    it('should be rendered only if is true', () => {
      const wrapper = mount(<Overlay arrow border="1px solid red" />);
      wrapper.setState({ arrowConfig: {} });
      expect(wrapper.find('.react-overlay__arrow')).to.have.length(1);
      wrapper.setProps({ arrow: false });
      expect(wrapper.find('.react-overlay__arrow')).to.have.length(0);
    });
  });
  describe('arrowSize', () => {
    it('numeric sets both width and height to same value', () => {
      const wrapper = mount(<Overlay border="1px solid red" />);
      wrapper.setState({ arrowConfig: {} });

      wrapper.setProps({ arrowSize: 20 });
      expect(
        wrapper
          .find('.react-overlay__arrow')
          .at(0)
          .props().style.width
      ).to.equal(20);
      expect(
        wrapper
          .find('.react-overlay__arrow')
          .at(0)
          .props().style.height
      ).to.equal(20);
    });
    xit('if object is applied on style', () => {
      const wrapper = mount(<Overlay border="1px solid red" />);
      wrapper.setState({ arrowConfig: {} });
      wrapper.setProps({ arrowSize: { width: 20, height: 30 } });
      expect(
        wrapper
          .find('.react-overlay__arrow')
          .at(0)
          .props().style.width
      ).to.equal(20);
      expect(
        wrapper
          .find('.react-overlay__arrow')
          .at(0)
          .props().style.height
      ).to.equal(30);
    });
  });
});
