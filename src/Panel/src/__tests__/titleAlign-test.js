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
const titleBarClassName = `${rootClassName}__title`;

describe('titleAlign', () => {
  it('should default to start', () => {
    const wrapper = mount(<Panel />);
    expect(wrapper.props().titleAlign).to.be.null;
  });

  it('should add correct className', () => {
    const wrapper = mount(<Panel />);

    wrapper.setProps({ titleAlign: 'start' });
    const startClassName = `.${titleBarClassName}--align-start`;
    expect(wrapper.find(startClassName)).to.have.length(1);

    wrapper.setProps({ titleAlign: 'center' });
    const centerClassName = `.${titleBarClassName}--align-center`;
    expect(wrapper.find(centerClassName)).to.have.length(1);

    wrapper.setProps({ titleAlign: 'end' });
    const endClassName = `.${titleBarClassName}--align-end`;
    expect(wrapper.find(endClassName)).to.have.length(1);

    wrapper.setProps({ titleAlign: 'left' });
    const leftClassName = `.${titleBarClassName}--align-left`;
    expect(wrapper.find(leftClassName)).to.have.length(1);

    wrapper.setProps({ titleAlign: 'right' });
    const rightClassName = `.${titleBarClassName}--align-right`;
    expect(wrapper.find(rightClassName)).to.have.length(1);
  });
});
