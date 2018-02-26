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
const titleBarClassName = `.${rootClassName}__title-bar`;
const titleClassName = `${rootClassName}__title`;

describe('renderAfterAndBeforeTitle', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  describe('renderBeforeTitle', () => {
    it('should be called with props', () => {
      const renderBeforeTitle = sinon.spy();
      wrapper.setProps({ id: 'customId' });
      wrapper.setProps({ renderBeforeTitle });
      expect(renderBeforeTitle.called).to.be.true;
      expect(renderBeforeTitle.args[0][0].id).to.equal('customId');
    });

    it('should render what it returns', () => {
      const renderBeforeTitle = () => {
        return <div id="customId2" />;
      };
      wrapper.setProps({ renderBeforeTitle });
      expect(wrapper.find('#customId2')).to.have.length(1);
    });

    it('should be rendered before title', () => {
      const renderBeforeTitle = () => {
        return <div id="renderedBeforeTitleId" />;
      };
      wrapper.setProps({ renderBeforeTitle });
      const titleBarWrapper = wrapper.find(titleBarClassName);
      expect(titleBarWrapper.childAt(0).props().id).to.equal(
        'renderedBeforeTitleId'
      );

      expect(titleBarWrapper.childAt(1).hasClass(titleClassName)).to.be.true;
    });
  });

  describe('renderAfterTitle', () => {
    it('should be called with props', () => {
      const renderAfterTitle = sinon.spy();
      wrapper.setProps({ id: 'customId' });
      wrapper.setProps({ renderAfterTitle });
      expect(renderAfterTitle.called).to.be.true;
      expect(renderAfterTitle.args[0][0].id).to.equal('customId');
    });

    it('should render what it returns', () => {
      const renderAfterTitle = () => {
        return <div id="customId2" />;
      };
      wrapper.setProps({ renderAfterTitle });
      expect(wrapper.find('#customId2')).to.have.length(1);
    });

    it('should be rendered after title', () => {
      const renderAfterTitle = () => {
        return <div id="renderedAfterTitleId" />;
      };
      wrapper.setProps({ renderAfterTitle });
      const titleBarWrapper = wrapper.find(titleBarClassName);
      expect(titleBarWrapper.childAt(1).props().id).to.equal(
        'renderedAfterTitleId'
      );

      expect(titleBarWrapper.childAt(0).hasClass(titleClassName)).to.be.true;
    });
  });
});
