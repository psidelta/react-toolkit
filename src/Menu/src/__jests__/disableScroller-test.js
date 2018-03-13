import React from 'react';
import Menu from '../Menu';
import ArrowScroller from '../../../ArrowScroller';
import { mount, shallow } from 'enzyme';

describe('disableScroller', () => {
  it("when false it doesn't use ArrowScroller", () => {
    const wrapper = shallow(<Menu disableScroller />);
    expect(wrapper.find(ArrowScroller).length).toBe(0);
  });
});
