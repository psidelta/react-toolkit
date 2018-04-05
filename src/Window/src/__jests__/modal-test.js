/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Window from '../Window';
import { shallow } from 'enzyme';
const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('modal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Window />);
  });

  it('adds --modal class name', () => {
    wrapper.setProps({ modal: true });
    expect(wrapper.find(`.${ROOT_CLASS}--modal`)).toHaveLength(1);
  });

  describe('modal wrapper', () => {
    it('renders a wrapper if it is topmost modal', () => {
      wrapper.setProps({ modal: true });
      wrapper.setState({ isTopModal: true });
      expect(wrapper.find(`.${ROOT_CLASS}__modal-wrapper`)).toHaveLength(1);
    });

    xit('adds a wrapper only if it is topmost modal', () => {
      wrapper.setProps({ modal: true });
      wrapper.setState({ isTopModal: false });

      expect(wrapper.find(`.${ROOT_CLASS}__modal-wrapper`)).toHaveLength(0);
    });
  });
});
