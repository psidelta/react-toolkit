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
import { shallow, mount } from 'enzyme';
import Overlay from '../Overlay';

describe('Overlay', () => {
  it('should create instance of Overlay', () => {
    const wrapper = shallow(<Overlay target=".tooltip" />);
    expect(wrapper.instance()).to.be.instanceOf(Overlay);
  });
  it('should add className', () => {
    const wrapper = shallow(<Overlay target=".tooltip" className="custom-class-name" />);
    expect(wrapper.find('.custom-class-name')).to.have.length(1);
  });
  it('should add style', () => {
    const wrapper = mount(<Overlay target=".tooltip" style={{ color: 'red' }} />);
    expect(wrapper.props().style.color).to.equal('red');
  });
});
