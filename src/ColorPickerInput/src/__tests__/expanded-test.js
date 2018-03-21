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
import ColorPickerInput from '../ColorPickerInput';
import { shallow } from 'enzyme';

describe('expanded', () => {
  it('uses defaultExpanded as default value', () => {
    const wrapper = shallow(<ColorPickerInput defaultExpanded />);
    expect(wrapper.instance().getExpanded()).to.be.true;
  });
  it('updates exapnded when uncontrolled', () => {
    const wrapper = shallow(<ColorPickerInput defaultExpanded />);
    wrapper.instance().handleExpandButtonClick();
    expect(wrapper.instance().getExpanded()).to.be.false;
  });
  it("doesn't update expanded when controlled", () => {
    const wrapper = shallow(<ColorPickerInput defaultExpanded expanded />);
    wrapper.instance().handleExpandButtonClick();
    expect(wrapper.instance().getExpanded()).to.be.true;
  });
  it('collapses when value changes if `collapseOnValueChange` is true', () => {
    const wrapper = shallow(
      <ColorPickerInput collapseOnValueChange defaultExpanded />
    );
    expect(wrapper.instance().getExpanded()).to.be.true;
    wrapper.instance().setValue('#fff');
    expect(wrapper.instance().getExpanded()).to.be.false;
  });
  it('onExpandChange is called when expand changes', () => {
    const onExpandChange = sinon.spy();
    const wrapper = shallow(
      <ColorPickerInput defaultExpanded onExpandChange={onExpandChange} />
    );
    wrapper.instance().setExpanded(false);
    expect(onExpandChange.called).to.be.true;
  });
  it('expandOnFocus expands the component when it receives focus', () => {
    const wrapper = shallow(
      <ColorPickerInput expandOnFocus defaultExpanded={false} />
    );
    wrapper.instance().handleFocus();
    expect(wrapper.instance().getExpanded()).to.be.true;
  });

  it('renderExpandButton overwrites expand button by returning jsx', () => {
    const wrapper = shallow(
      <ColorPickerInput
        renderExpandButton={() => <div id="customExpandButton" />}
      />
    );
    expect(wrapper.find('#customExpandButton')).to.have.length(1);
  });

  it('renderExpandButton overwrites expand button my mutating buttonProps', () => {
    const wrapper = shallow(
      <ColorPickerInput
        renderExpandButton={({ buttonProps }) => {
          buttonProps.id = 'customExpandButton';
        }}
      />
    );
    expect(wrapper.find('#customExpandButton')).to.have.length(1);
  });
});
