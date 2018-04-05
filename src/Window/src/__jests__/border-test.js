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

describe('border', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  it('renders specified border', () => {
    wrapper.setProps({ border: 'custom border' });
    expect(wrapper.find(`.${ROOT_CLASS}`).props().style.border).toEqual(
      'custom border'
    );
  });
});
