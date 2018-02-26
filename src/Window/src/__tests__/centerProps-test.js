import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';
const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('centered props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  describe('centered', () => {
    it('adds --  className', () => {
      wrapper.setProps({ centered: true });
      expect(wrapper.find(`.${ROOT_CLASS}--centered`)).to.have.length(1);
    });
    it('should not set position and size props on style when true', () => {
      wrapper.setProps({
        maximized: true,
        size: { width: 100, height: 100 },
        position: { top: 100, left: 200 }
      });

      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.top).to.be.empty;
      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.left).to.be.empty;
      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.width).to.be.empty;
      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.height).to.be.empty;
    });
  });
  describe('defaultCentered', () => {
    it("uses it's value as default", () => {
      const wrapper = mount(<Window defaultCentered />);
      expect(wrapper.instance().getCentered()).to.be.true;
    });
  });
});
