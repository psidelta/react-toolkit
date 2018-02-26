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
import { shallow, mount } from 'enzyme';

describe('Button', () => {
  it('onClick is called when button is clicked', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<Button onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick.called).to.be.true;
  });
  it(
    'toggles between pressed true and false onclick when pressed has value',
    () => {
      const onToggle = sinon.spy();
      const wrapper = shallow(
        <Button onToggle={onToggle} defaultPressed={false} />
      );
      expect(wrapper.instance().isPressed()).to.be.false;
      wrapper.simulate('click');
      expect(wrapper.instance().isPressed()).to.be.true;
      expect(onToggle.called).to.be.true;
    }
  );
  it('onActivate is called when the button receives mouse down', () => {
    const onActivate = sinon.spy();
    const wrapper = shallow(<Button onActivate={onActivate} />);
    wrapper.simulate('mouseDown');
    expect(onActivate.called).to.be.true;
  });
  it(
    'onDeactivate is called whe button is active and registeres a mouseUp on global',
    () => {
      const mouseupEvent = new CustomEvent('mouseup', { bubbles: true });
      const onDeactivate = sinon.spy();
      const wrapper = shallow(<Button onDeactivate={onDeactivate} />);
      wrapper.simulate('mouseDown');
      global.dispatchEvent(mouseupEvent);
      expect(onDeactivate.called).to.be.true;
    }
  );
  it('style is applied on buton', () => {
    const wrapper = mount(<Button id="button" style={{ color: 'red' }} />);
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
  it('calls style if a function and applies the style on button', () => {
    const wrapper = mount(
      <Button id="button" style={() => ({ color: 'red' })} />
    );
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
});
