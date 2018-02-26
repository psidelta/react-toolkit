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
