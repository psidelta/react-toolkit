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
import Panel from '../Panel';
import { mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const titleRotateClassName90 = `.${rootClassName}--title-rotate-90`;
const titleRotateClassName_90 = `.${rootClassName}--title-rotate--90`;

describe('titleRotate', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  it('should default to null', () => {
    expect(wrapper.props().titleRotate).to.be.null;
  });

  it('should default to -90 for titleRotate left', () => {
    wrapper.setProps({ titleBarPosition: 'left' });
    expect(wrapper.find(titleRotateClassName_90)).to.have.length(1);
  });

  it('should default to 90 for titleRotate right', () => {
    wrapper.setProps({ titleBarPosition: 'right' });
    expect(wrapper.find(titleRotateClassName90)).to.have.length(1);
  });

  it('should add correct className for 90', () => {
    wrapper.setProps({ titleBarPosition: 'right', titleRotate: 90 });
    expect(wrapper.find(titleRotateClassName90)).to.have.length(1);

    wrapper.setProps({ titleBarPosition: 'left', titleRotate: -90 });
    expect(wrapper.find(titleRotateClassName_90)).to.have.length(1);
  });
});
