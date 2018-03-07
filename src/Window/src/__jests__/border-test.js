import React from 'react';
import Window from '../Window';
import { mount } from 'enzyme';

const ROOT_CLASS = Window.defaultProps.rootClassName;

describe('border', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Window />);
  });

  it('renders specified border', () => {
    wrapper.setProps({ border: 'custom border' });
    expect(wrapper.find(`.${ROOT_CLASS}`).props().style.border).toEqual(
      'custom border'
    );
  });
});
