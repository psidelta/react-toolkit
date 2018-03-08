import React from 'react';
import { shallow, mount } from 'enzyme';
import Overlay from '../Overlay';

describe('Overlay', () => {
  it('should create instance of Overlay', () => {
    const wrapper = shallow(<Overlay target=".tooltip" />);
    expect(wrapper.instance()).toBeInstanceOf(Overlay);
  });
  it('should add className', () => {
    const wrapper = shallow(
      <Overlay target=".tooltip" className="custom-class-name" />
    );
    expect(wrapper.find('.custom-class-name')).toHaveLength(1);
  });
  it('should add style', () => {
    const wrapper = mount(
      <Overlay target=".tooltip" style={{ color: 'red' }} />
    );
    expect(wrapper.props().style.color).toEqual('red');
  });
});
