import React from 'react';
import Panel from '../Panel';
import { mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const rtlClassName = `.${rootClassName}--rtl`;

describe('rtl', () => {
  it('should default to false', () => {
    const wrapper = mount(<Panel />);
    expect(wrapper.props().rtl).toBe(false);
  });
  it('should add --rlt classname', () => {
    const wrapper = mount(<Panel />);
    expect(wrapper.find(rtlClassName)).toHaveLength(0);
    wrapper.setProps({ rtl: true });
    expect(wrapper.find(rtlClassName)).toHaveLength(1);
  });
});
