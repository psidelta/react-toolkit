import React from 'react';
import Panel from '../Panel';
import { mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const bodyClassName = `.${rootClassName}__body`;

describe('bodyStyle', () => {
  it('should default to false', () => {
    const bodyStyle = { left: 'customLeft' };
    const wrapper = mount(<Panel bodyStyle={bodyStyle} />);
    expect(
      wrapper
        .find(bodyClassName)
        .first()
        .props().style.left
    ).to.equal('customLeft');
  });
});
