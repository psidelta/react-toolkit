/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ColorPickerInput from '../ColorPickerInput';
import { shallow } from 'enzyme';

describe('expanded', () => {
  it('uses defaultExpanded as default value', () => {
    const wrapper = shallow(<ColorPickerInput defaultExpanded />);

    expect(wrapper.instance().getExpanded()).toBe(true);
  });
  it('updates exapnded when uncontrolled', () => {
    const wrapper = shallow(<ColorPickerInput defaultExpanded />);
    wrapper.instance().handleExpandButtonClick();
    expect(wrapper.instance().getExpanded()).toBe(false);
  });
  it("doesn't update expanded when controlled", () => {
    const wrapper = shallow(<ColorPickerInput defaultExpanded expanded />);
    wrapper.instance().handleExpandButtonClick();
    expect(wrapper.instance().getExpanded()).toBe(true);
  });
  it('collapses when value changes if `collapseOnValueChange` is true', () => {
    const wrapper = shallow(
      <ColorPickerInput collapseOnValueChange defaultExpanded />
    );
    expect(wrapper.instance().getExpanded()).toBe(true);
    wrapper.instance().setValue('#fff');
    expect(wrapper.instance().getExpanded()).toBe(false);
  });
  it('onExpandChange is called when expand changes', () => {
    const onExpandChange = sinon.spy();
    const wrapper = shallow(
      <ColorPickerInput defaultExpanded onExpandChange={onExpandChange} />
    );
    wrapper.instance().setExpanded(false);
    expect(onExpandChange.called).toBe(true);
  });
  it('expandOnFocus expands the component when it receives focus', () => {
    const wrapper = shallow(
      <ColorPickerInput expandOnFocus defaultExpanded={false} />
    );
    wrapper.instance().handleFocus();
    expect(wrapper.instance().getExpanded()).toBe(true);
  });

  it('renderExpandButton overwrites expand button by returning jsx', () => {
    const wrapper = shallow(
      <ColorPickerInput
        renderExpandButton={() => <div id="customExpandButton" />}
      />
    );
    expect(wrapper.find('#customExpandButton')).toHaveLength(1);
  });

  it('renderExpandButton overwrites expand button my mutating buttonProps', () => {
    const wrapper = shallow(
      <ColorPickerInput
        renderExpandButton={({ buttonProps }) => {
          buttonProps.id = 'customExpandButton';
        }}
      />
    );
    expect(wrapper.find('#customExpandButton')).toHaveLength(1);
  });
});
