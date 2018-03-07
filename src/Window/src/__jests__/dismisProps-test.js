import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';
import Icon from '../../../common/Icon';

describe('dismiss props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  describe('onClose', () => {
    it('is called when Icon is clicked', () => {
      const onClose = jest.fn();
      wrapper.setProps({ closeable: true, onClose });
      const closeIcon = wrapper
        .find('.zippy-react-toolkit-window__close-icon')
        .first();
      closeIcon.simulate('click');
      expect(onClose).toHaveBeenCalled();
    });
  });
  describe('closeIcon', () => {
    it('renders jsx', () => {
      wrapper.setProps({
        closeable: true,
        closeIcon: <div id="closeIcon" />
      });
      expect(wrapper.find('#closeIcon')).toHaveLength(1);
    });
  });
});
