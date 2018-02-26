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
const bodyClassName = `.${rootClassName}__body`;

describe('renderFooter', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  it('should be called with props', () => {
    const renderFooter = sinon.spy();
    wrapper.setProps({ data: 'footerData' });
    wrapper.setProps({ renderFooter });

    expect(renderFooter.called).to.be.true;
    expect(renderFooter.args[0][0].data).to.equal('footerData');
  });

  it('should render what it returns', () => {
    const renderFooter = () => <div id="customFooterId" />;
    wrapper.setProps({ renderFooter });

    expect(wrapper.find('#customFooterId')).to.have.length(1);
  });

  it('should be rendered after body', () => {
    const renderFooter = () => <div id="customFooterId" />;
    wrapper.setProps({ renderFooter });

    /**
     * 0 - title
     * 1 - body
     * 2 - footer
     */
    expect(wrapper.childAt(2).props().id).to.equal('customFooterId');
  });
});
