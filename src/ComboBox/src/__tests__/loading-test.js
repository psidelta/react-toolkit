import React from 'react';
import { shallow, mount } from 'enzyme';
import Combo from '../ComboBox';

describe('loading', () => {
  describe('defaultLoading', () => {
    it('should be used as initial state', () => {
      const wrapper = shallow(<Combo defaultLoading />);
      expect(wrapper.instance().getLoading()).to.be.true;
    });
  });

  describe('constrolled loading', () => {
    it('should be used insted of state', () => {
      const wrapper = shallow(<Combo defaultLoading loading={false} />);
      expect(wrapper.instance().getLoading()).to.to.be.false;
    });
    it("doesn't change when a change is triggered", () => {
      const wrapper = shallow(<Combo defaultLoading loading={false} />);
      wrapper.instance().setLoading(true);
      expect(wrapper.instance().getLoading()).to.to.be.false;
      // state should not be changed
      expect(wrapper.state().loading).to.be.true;
    });
  });
  describe('onLoadingChange', () => {
    it('should be called when setLoaindg is called', () => {
      const onLoadingChange = sinon.spy();
      const wrapper = shallow(<Combo onLoadingChange={onLoadingChange} />);
      wrapper.instance().setLoading(true);
      expect(onLoadingChange.called).to.be.true;
      expect(onLoadingChange.args[0][0]).to.be.true;
    });
  });
});
