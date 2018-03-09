import React from 'react';
import { shallow } from 'enzyme';

import Overlay from '../Overlay';

describe('methods', () => {
  it('show triggers visible change', () => {
    const onShow = jest.fn();
    const wrapper = shallow(<Overlay onShow={onShow} />);
    wrapper.instance().show();
    expect(onShow.mock.calls.length).toBe(1);
    expect(wrapper.instance().getVisible()).toBe(true);
  });
  it('hide triggers visible change', () => {
    const onHide = jest.fn();
    const wrapper = shallow(<Overlay onHide={onHide} />);
    wrapper.instance().hide();
    expect(onHide.mock.calls.length).toBe(1);
    expect(wrapper.instance().getVisible()).toBe(false);
  });
});
