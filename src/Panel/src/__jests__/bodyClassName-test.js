import React from 'react';
import Panel from '../Panel';
import { mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const bodyClassName = `.${rootClassName}__body`;

describe('bodyStyle', () => {
  it('should default to false', () => {
    const className = 'customClassName';
    const wrapper = mount(<Panel bodyClassName={className} />);

    expect(wrapper.find(`.${className}`)).toHaveLength(1);
  });
});
