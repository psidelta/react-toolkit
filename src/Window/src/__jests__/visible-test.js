import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';

const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('visible props', () => {
  describe('visible false', () => {
    it('should add --invisible className if false', () => {
      const wrapper = mount(<Window visible={false} />);
      expect(wrapper.find(`.${ROOT_CLASS}--invisible`).length).toBeGreaterThan(
        0
      );
    });
    it('should render null when `renderNullWhenInvisible` is true', () => {
      const wrapper = mount(
        <Window visible={false} renderNullWhenInvisible={true} />
      );
      expect(wrapper.instance().render()).toBe(null);
    });
  });
  describe('visible true', () => {
    it("doesn't add --invisible className", () => {
      const wrapper = mount(<Window visible={true} />);
      expect(wrapper.find(`.${ROOT_CLASS}--invisible`)).toHaveLength(0);
    });
  });
});
