import React from 'react';
import { shallow } from 'enzyme';

import Overlay from '../Overlay';

describe('events', () => {
  it('onShow called when visibile changes to true', () => {
    const onShow = sinon.spy();
    const wrapper = shallow(<Overlay onShow={onShow} defaultVisible={false} />);
    wrapper.instance().setVisible(true);
    expect(onShow.called).to.be.true;
  });
  it('onHide called when visibile changes to false', () => {
    const onHide = sinon.spy();
    const wrapper = shallow(<Overlay onHide={onHide} defaultVisible />);
    wrapper.instance().setVisible(false);
    expect(onHide.called).to.be.true;
  });
  it('onVisibleChange is called whenever visibile changes, it is called with new state', () => {
    const onVisibleChange = sinon.spy();
    const wrapper = shallow(
      <Overlay onVisibleChange={onVisibleChange} defaultVisible />
    );
    wrapper.instance().setVisible(false);
    expect(onVisibleChange.called).to.be.true;
    expect(onVisibleChange.args[0][0]).to.be.false;
  });
});
