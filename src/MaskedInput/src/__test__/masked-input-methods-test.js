import React from 'react';

import MaskedInput, { CLASS_NAME } from '../MaskedInput';
import { shallow, mount } from 'enzyme';

describe('MaskedInput Methods', () => {
  it('should get the masked value', () => {
    const component = shallow(<MaskedInput value={'12456'} mask="99-999" />);

    const maskedValue = component.instance().getMaskedValue();
    expect(maskedValue).to.equal('12-456');
  });
  it('should get the raw value', () => {
    const component = shallow(<MaskedInput value={'12456'} mask="99-999" />);

    const maskedValue = component.instance().getValue();
    expect(maskedValue).to.equal('12456');
  });
});
