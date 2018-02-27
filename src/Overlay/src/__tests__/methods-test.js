import React from 'react';
import { shallow } from 'enzyme';

import Overlay from '../Overlay';

describe('methods', () => {
  it('show triggers visible change', () => {
    const onShow = sinon.spy();
    const wrapper = shallow(<Overlay onShow={onShow} />);
    wrapper.instance().show();
    expect(onShow.called).to.be.true;
    expect(wrapper.instance().getVisible()).to.be.true;
  });
  it('hide triggers visible change', () => {
    const onHide = sinon.spy();
    const wrapper = shallow(<Overlay onHide={onHide} />);
    wrapper.instance().hide();
    expect(onHide.called).to.be.true;
    expect(wrapper.instance().getVisible()).to.be.false;
  });
});
