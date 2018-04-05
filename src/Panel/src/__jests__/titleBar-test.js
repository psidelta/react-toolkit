/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Panel from '../Panel';
import join from '../../../common/join';
import { mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const titleClassName = `${rootClassName}__title-bar`;
const borderBottomClassName = `${rootClassName}__title-bar-border-bottom`;
const borderTopClassName = `${rootClassName}__title-bar-border-top`;

describe('renderTitleBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  it('should not render renderTitleBar if false', () => {
    expect(wrapper.find(`.${titleClassName}`)).toHaveLength(1);
    wrapper.setProps({ renderTitleBar: false });
    expect(wrapper.find(`.${titleClassName}`)).toHaveLength(0);
  });

  xdescribe('jsx', () => {
    it('should render jsx insted of renderTitlebar', () => {
      wrapper.setProps({ renderTitleBar: <div id="customTitleBarId" /> });
      expect(wrapper.find('#customTitleBarId')).toHaveLength(1);
      expect(wrapper.find(titleClassName)).toHaveLength(0);
    });
  });

  describe('function', () => {
    it('should be called with domProps and props', () => {
      const renderTitleBar = jest.fn(() => <div id="customData" />);
      const wrapper = mount(
        <Panel renderTitleBar={renderTitleBar} titleBarPosition="top" />
      );

      expect(renderTitleBar).toHaveBeenCalledTimes(1);
      expect(wrapper.find('#customData')).toHaveLength(1);
      expect(renderTitleBar.mock.calls[0][0].className).toEqual(
        join(titleClassName, borderBottomClassName)
      );
    });

    it('should be called with domProps and props', () => {
      const renderTitleBar = jest.fn(() => <div id="customData" />);
      const wrapper = mount(
        <Panel renderTitleBar={renderTitleBar} titleBarPosition="bottom" />
      );
      expect(wrapper.find('#customData')).toHaveLength(1);
      expect(renderTitleBar.mock.calls[0][0].className).toEqual(
        join(titleClassName, borderTopClassName)
      );
    });

    it('should render renderTitlebar with mutated domProps', () => {
      const renderTitleBar = domProps => {
        domProps.id = 'titleBarId';
      };
      wrapper.setProps({ renderTitleBar });
      expect(wrapper.find('#titleBarId')).toHaveLength(1);
    });
  });
});
