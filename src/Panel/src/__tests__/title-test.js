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
import Panel, { CLASS_NAME } from '../Panel';
import { mount } from 'enzyme';

describe('title', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  describe('node', () => {
    it('should render as title text when string', () => {
      const title = 'hello world';
      wrapper.setProps({ title });
      expect(wrapper.find(`.${CLASS_NAME}__title`).first().text()).to.equal(
        title
      );
    });

    it('should render jsx', () => {
      const title = <div id="customId" />;
      wrapper.setProps({ title });
      expect(wrapper.find('#customId')).to.have.length(1);
    });
  });

  describe('function', () => {
    it('should be called and renders what it returns', () => {
      const title = sinon.stub();
      title.returns(<div id="customFunctionId" />);
      wrapper.setProps({ title });

      expect(title.called).to.be.true;
      expect(wrapper.find('#customFunctionId')).to.have.length(1);
    });
    it('should render default title with mutated domProps', () => {
      const title = domProps => {
        domProps.id = 'customMutatedId';
      };
      wrapper.setProps({ title });
      expect(wrapper.find('#customMutatedId')).to.have.length(1);
    });
  });
});
