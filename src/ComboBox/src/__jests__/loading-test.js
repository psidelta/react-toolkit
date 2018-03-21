import React from 'react';
import { shallow, mount } from 'enzyme';
import Combo from '../ComboBox';

describe('loading', () => {
  describe('defaultLoading', () => {
    it('should be used as initial state', () => {
      const wrapper = shallow(<Combo defaultLoading />);
      expect(wrapper.instance().getLoading()).toBe(true);
    });
  });

  describe('constrolled loading', () => {
    it('should be used insted of state', () => {
      const wrapper = shallow(<Combo defaultLoading loading={false} />);
      expect(wrapper.instance().getLoading()).toBe(false);
    });
    it("doesn't change when a change is triggered", () => {
      const wrapper = shallow(<Combo defaultLoading loading={false} />);
      wrapper.instance().setLoading(true);
      expect(wrapper.instance().getLoading()).toBe(false);
      // state should not be changed
      expect(wrapper.state().loading).toBe(true);
    });
  });
  describe('onLoadingChange', () => {
    it('should be called when setLoaindg is called', () => {
      const onLoadingChange = jest.fn();
      const wrapper = shallow(<Combo onLoadingChange={onLoadingChange} />);
      wrapper.instance().setLoading(true);
      expect(onLoadingChange.mock.calls.length).toBe(1);
      expect(onLoadingChange.mock.calls[0][0]).toBe(true);
    });
  });
});
