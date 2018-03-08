import React from 'react';
import { shallow } from 'enzyme';

import Overlay from '../Overlay';

describe('methods', () => {
  it('show triggers visible change', () => {
    const onShow = sinon.spy();
    const wrapper = shallow(<Overlay onShow={onShow} />);
    wrapper.instance().show();
    expect(onShow.called).toBe(true);
    expect(wrapper.instance().getVisible()).toBe(true);
  });
  it('hide triggers visible change', () => {
    const onHide = sinon.spy();
    const wrapper = shallow(<Overlay onHide={onHide} />);
    wrapper.instance().hide();
    expect(onHide.called).toBe(true);
    expect(wrapper.instance().getVisible()).toBe(false);
  });
});
