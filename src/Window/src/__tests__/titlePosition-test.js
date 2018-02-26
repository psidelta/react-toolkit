import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';

const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('titlePosition', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  describe('start', () => {
    it('renders title as first child', () => {
      wrapper.setProps({ titlePosition: 'start' });
      expect(
        wrapper.find(`.${ROOT_CLASS}__title-bar`).childAt(0).props().className
      ).to.equal(`${ROOT_CLASS}__title-wrapper`);
    });
  });

  describe('end', () => {
    it('renders title as last child', () => {
      wrapper.setProps({ titlePosition: 'end' });
      expect(
        wrapper.find(`.${ROOT_CLASS}__title-bar`).childAt(1).props().className
      ).to.equal(`${ROOT_CLASS}__title-wrapper`);
    });
  });
});
