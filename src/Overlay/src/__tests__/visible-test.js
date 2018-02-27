import React from 'react';
import { shallow } from 'enzyme';
import Overlay from '../Overlay';

describe('visible', () => {
  it('renders correct className', () => {
    const wrapper = shallow(<Overlay visible />);
    expect(wrapper.find('.react-overlay--visible')).to.have.length(1);
    wrapper.setProps({ visible: false });
    expect(wrapper.find('.react-overlay--visible')).to.have.length(0);
  });
  it('controlled visible is not changed by setVisible', () => {
    const wrapper = shallow(<Overlay visible />);
    expect(wrapper.instance().getVisible()).to.be.true;
    wrapper.instance().setVisible(false);
    expect(wrapper.instance().getVisible()).to.be.true;
  });
  it('calls onVisibleChange', () => {
    const onVisibleChange = sinon.spy();
    const wrapper = shallow(<Overlay onVisibleChange={onVisibleChange} />);
    wrapper.instance().setVisible(true);
    expect(onVisibleChange.called).to.be.true;
  });
  it('visible state changes when uncontrolled', () => {
    const wrapper = shallow(<Overlay />);
    wrapper.instance().setVisible(true);
    expect(wrapper.instance().getVisible()).to.be.true;
  });
  it('defaultVisible it is used as initial uncontrolled value', () => {
    const wrapper = shallow(<Overlay defaultVisible />);
    expect(wrapper.instance().getVisible()).to.be.true;
    wrapper.instance().setVisible(false);
    expect(wrapper.instance().getVisible()).to.be.false;
  });
});
