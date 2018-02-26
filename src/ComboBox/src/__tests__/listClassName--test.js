import React from 'react';
import { shallow } from 'enzyme';
import Combo from '../ComboBox';
import List from '../List';

describe('listClassName', () => {
  it('passes listClassName to List as className', () => {
    const wrapper = shallow(
      <Combo dataSource={[]} expanded listClassName={'test'} />
    );
    expect(
      wrapper
        .find(List)
        .at(0)
        .props().className
    ).to.equal('test');
  });
});
