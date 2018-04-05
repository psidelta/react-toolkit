/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import Panel from '../Panel';

const rootClassName = Panel.defaultProps.rootClassName;
const titleBarClassName = `${rootClassName}__title-bar`;
const titleClassName = `${rootClassName}__title`;

describe('renderAfterAndBeforeTitle', () => {
  describe('renderBeforeTitle', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Panel />);
    });

    it('should be called with props', () => {
      const renderBeforeTitle = jest.fn();
      wrapper.setProps({ renderBeforeTitle });
      expect(renderBeforeTitle).toHaveBeenCalledTimes(1);
    });

    xit('should render what it returns', () => {
      const renderBeforeTitle = jest.fn(() => <div id="customId2" />);
      const wrapper = shallow(<Panel renderBeforeTitle={renderBeforeTitle} />);
      expect(wrapper.find('#customId2')).toHaveLength(1);
    });

    xit('should be rendered before title', () => {
      const renderBeforeTitle = jest.fn(() => (
        <div id="renderedBeforeTitleId" />
      ));
      const wrapper = shallow(<Panel renderBeforeTitle={renderBeforeTitle} />);
      const titleBarWrapper = wrapper.find(`.${titleBarClassName}`);

      expect(titleBarWrapper.childAt(0).props().id).toEqual(
        'renderedBeforeTitleId'
      );

      expect(titleBarWrapper.props().className).toContain(titleClassName);
    });
  });

  describe('renderAfterTitle', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Panel />);
    });

    it('should be called with props', () => {
      const renderAfterTitle = jest.fn();
      wrapper.setProps({ id: 'customId' });
      wrapper.setProps({ renderAfterTitle });
      expect(renderAfterTitle).toHaveBeenCalledTimes(1);
      expect(renderAfterTitle.mock.calls[0][0].id).toEqual('customId');
    });

    xit('should render what it returns', () => {
      const renderAfterTitle = jest.fn(() => <div id="customId2" />);
      const wrapper = shallow(<Panel renderAfterTitle={renderAfterTitle} />);
      expect(wrapper.find('#customId2')).toHaveLength(1);
    });

    xit('should be rendered after title', () => {
      const renderAfterTitle = jest.fn(() => <div id="renderedAfterTitleId" />);
      const wrapper = shallow(<Panel renderAfterTitle={renderAfterTitle} />);

      const titleBar = wrapper.find(`.${titleBarClassName}`);

      expect(titleBar.childAt(1).props().id).toEqual('renderedAfterTitleId');
      expect(titleBar.props().className).toContain(titleClassName);
    });
  });
});
