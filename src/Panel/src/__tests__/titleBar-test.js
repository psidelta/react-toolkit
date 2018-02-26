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
const bodyClassName = `.${rootClassName}__title-bar`;

describe('titleBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  it('should not render titleBar if false', () => {
    expect(wrapper.find(bodyClassName)).to.have.length(1);
    wrapper.setProps({ titleBar: false });
    expect(wrapper.find(bodyClassName)).to.have.length(0);
  });

  xdescribe('jsx', () => {
    it('should render jsx insted of titlebar', () => {
      wrapper.setProps({ titleBar: <div id="customTitleBarId" /> });
      expect(wrapper.find('#customTitleBarId')).to.have.length(1);
      expect(wrapper.find(bodyClassName)).to.have.length(0);
    });
  });

  describe('function', () => {
    it('should be called with domProps and props', () => {
      const titleBar = sinon.spy();
      wrapper.setProps({ data: 'customData' });
      wrapper.setProps({ titleBar });

      expect(titleBar.called).to.be.true;
      expect(titleBar.args[0][0].className).to.equal(
        `${rootClassName}__title-bar`
      );
      expect(titleBar.args[0][1].data).to.equal('customData');
    });

    it('should render titlebar with mutated domProps', () => {
      const titleBar = domProps => {
        domProps.id = 'titleBarId';
      };
      wrapper.setProps({ titleBar });
      expect(wrapper.find('#titleBarId')).to.have.length(1);
    });
  });
});
