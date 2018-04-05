/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';

describe('renderToolBar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  it('renders what it returns', () => {
    const renderToolBar = () => <div id="helloWorld" />;
    wrapper.setProps({ renderToolBar });
    expect(wrapper.find('#helloWorld')).toHaveLength(1);
  });

  it('renders with mutated domProps', () => {
    const renderToolBar = domProps => {
      domProps.id = 'helloWorld';
    };
    wrapper.setProps({ renderToolBar });
    expect(wrapper.find('#helloWorld')).toHaveLength(1);
  });
});
