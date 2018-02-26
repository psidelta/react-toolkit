import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';

const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('position props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  describe('draggable', () => {
    it('adds --draggalbe className', () => {
      wrapper.setProps({ draggable: true });
      expect(wrapper.find(`.${ROOT_CLASS}--draggable`)).has.length(1);
    });
  });

  describe('positon controlled and uncontrolled', () => {
    it('sets correct style', () => {
      wrapper.setProps({
        position: {
          left: 100,
          right: 200,
          bottom: 100,
          top: 50
        }
      });

      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.left).to.equal(100);
      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.right).to.equal(200);
      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.bottom).to.equal(100);
      expect(wrapper.find(`.${ROOT_CLASS}`).props().style.top).to.equal(50);
    });

    it('controlled ovewrites uncontrolled', () => {
      const wrapper = mount(
        <Window defaultPosition={{ left: 10 }} position={{ left: 20 }} />
      );

      expect(wrapper.instance().getPosition().left).to.equal(20);
    });

    it('uncontrolled gets default from defaultProps', () => {
      const wrapper = mount(<Window defaultPosition={{ left: 10 }} />);

      expect(wrapper.instance().getPosition().left).to.equal(10);
    });
  });
});
