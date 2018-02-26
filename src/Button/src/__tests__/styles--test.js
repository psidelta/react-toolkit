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
import Button from '../Button';
import { mount } from 'enzyme';

describe('style', () => {
  it('adds pressedStyle when button is pressed', () => {
    const wrapper = mount(
      <Button id="button" pressed pressedStyle={{ color: 'red' }} />
    );
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
  it('adds focusedStyle when button is focused', () => {
    const wrapper = mount(
      <Button id="button" pressed focusedStyle={{ color: 'red' }} />
    );
    wrapper.setState({ focused: true });
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
  it('adds overStyle when button is over', () => {
    const wrapper = mount(
      <Button id="button" pressed overStyle={{ color: 'red' }} />
    );
    wrapper.setState({ mouseOver: true });
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
  it('adds activeStyle when button is active', () => {
    const wrapper = mount(
      <Button id="button" pressed activeStyle={{ color: 'red' }} />
    );
    wrapper.setState({ active: true });
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
});
