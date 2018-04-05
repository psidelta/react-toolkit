/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';

const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('titlePosition', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  describe('start', () => {
    it('renders title as first child', () => {
      wrapper.setProps({ titlePosition: 'start' });
      expect(
        wrapper
          .find(`.${ROOT_CLASS}__title-bar`)
          .childAt(0)
          .props().className
      ).toEqual(`${ROOT_CLASS}__title-wrapper`);
    });
  });

  describe('end', () => {
    it('renders title as last child', () => {
      wrapper.setProps({ titlePosition: 'end' });
      expect(
        wrapper
          .find(`.${ROOT_CLASS}__title-bar`)
          .childAt(1)
          .props().className
      ).toEqual(`${ROOT_CLASS}__title-wrapper`);
    });
  });
});
