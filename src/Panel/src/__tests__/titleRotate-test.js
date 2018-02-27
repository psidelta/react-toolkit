import React from 'react';
import Panel from '../Panel';
import { mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const titleRotateClassName90 = `.${rootClassName}--title-rotate-90`;
const titleRotateClassName_90 = `.${rootClassName}--title-rotate--90`;

describe('titleRotate', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  it('should default to null', () => {
    expect(wrapper.props().titleRotate).to.be.null;
  });

  it('should default to -90 for titleRotate left', () => {
    wrapper.setProps({ titleBarPosition: 'left' });
    expect(wrapper.find(titleRotateClassName_90)).to.have.length(1);
  });

  it('should default to 90 for titleRotate right', () => {
    wrapper.setProps({ titleBarPosition: 'right' });
    expect(wrapper.find(titleRotateClassName90)).to.have.length(1);
  });

  it('should add correct className for 90', () => {
    wrapper.setProps({ titleBarPosition: 'right', titleRotate: 90 });
    expect(wrapper.find(titleRotateClassName90)).to.have.length(1);

    wrapper.setProps({ titleBarPosition: 'left', titleRotate: -90 });
    expect(wrapper.find(titleRotateClassName_90)).to.have.length(1);
  });
});
