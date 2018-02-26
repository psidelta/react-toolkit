import React from 'react';
import Window from '../Window';
import { shallow } from 'enzyme';
const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('modal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Window />);
  });

  it('adds --modal class name', () => {
    wrapper.setProps({ modal: true });
    expect(wrapper.find(`.${ROOT_CLASS}--modal`)).to.have.length(1);
  });

  describe('modal wrapper', () => {
    it('renders a wrapper if it is topmost modal', () => {
      wrapper.setProps({ modal: true });
      wrapper.setState({ isTopModal: true });
      expect(wrapper.find(`.${ROOT_CLASS}__modal-wrapper`)).to.have.length(1);
    });

    it('adds a wrapper only if it is topmost modal', () => {
      wrapper.setProps({ modal: true });
      wrapper.setState({ isTopModal: false });

      expect(wrapper.find(`.${ROOT_CLASS}__modal-wrapper`)).to.have.length(0);
    });
  });
});
