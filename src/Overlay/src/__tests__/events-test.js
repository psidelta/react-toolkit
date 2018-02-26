/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    const wrapper = shallow(<Overlay onVisibleChange={onVisibleChange} defaultVisible />);
    wrapper.instance().setVisible(false);
    expect(onVisibleChange.called).to.be.true;
    expect(onVisibleChange.args[0][0]).to.be.false;
  });
});
