import React from 'react';
import Window from '../Window';
import { shallow } from 'enzyme';

const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('fixed true', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Window />);
  });

  it('adds --fixed className', () => {
    wrapper.setProps({ relativeToViewport: true });
    expect(wrapper.find(`.${ROOT_CLASS}--fixed`)).toHaveLength(1);
  });

  it('adds --fixed className on wrapper if relativeToViewport is true', () => {
    wrapper.setProps({ modal: true, relativeToViewport: true });
    wrapper.setState({ isTopModal: true });
    expect(wrapper.find(`.${ROOT_CLASS}__modal-wrapper--fixed`)).toHaveLength(
      1
    );
  });
});
