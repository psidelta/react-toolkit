import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';
import Icon from '../../../common/Icon';

describe('dismiss props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  describe('closeable', () => {
    it('renders close icon type close-regular', () => {
      wrapper.setProps({ closeable: true });
      const closeIcon = wrapper
        .find(Icon)
        .filterWhere(item => item.props().type === 'close-regular');
      expect(closeIcon).to.have.length(1);
    });
  });
  describe('onClose', () => {
    it('is called when Icon is clicked', () => {
      const onClose = sinon.spy();
      wrapper.setProps({ closeable: true, onClose });
      // wrapper.find(Icon).first().simulate('click');
      const closeIcon = wrapper
        .find(Icon)
        .filterWhere(item => item.props().type === 'close-regular')
        .first();
      closeIcon.simulate('click');
      expect(onClose.called).to.be.true;
    });
  });
  describe('closeIcon', () => {
    it('renders jsx', () => {
      wrapper.setProps({
        closeable: true,
        closeIcon: <div id="closeIcon" />
      });
      expect(wrapper.find('#closeIcon')).to.have.length(1);
    });
  });
});
