import React from 'react';
import Panel from '../Panel';
import { mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const titleBarClassName = `${rootClassName}__title`;

describe('titleAlign', () => {
  it('should default to start', () => {
    const wrapper = mount(<Panel />);
    expect(wrapper.props().titleAlign).to.be.null;
  });

  it('should add correct className', () => {
    const wrapper = mount(<Panel />);

    wrapper.setProps({ titleAlign: 'start' });
    const startClassName = `.${titleBarClassName}--align-start`;
    expect(wrapper.find(startClassName)).to.have.length(1);

    wrapper.setProps({ titleAlign: 'center' });
    const centerClassName = `.${titleBarClassName}--align-center`;
    expect(wrapper.find(centerClassName)).to.have.length(1);

    wrapper.setProps({ titleAlign: 'end' });
    const endClassName = `.${titleBarClassName}--align-end`;
    expect(wrapper.find(endClassName)).to.have.length(1);

    wrapper.setProps({ titleAlign: 'left' });
    const leftClassName = `.${titleBarClassName}--align-left`;
    expect(wrapper.find(leftClassName)).to.have.length(1);

    wrapper.setProps({ titleAlign: 'right' });
    const rightClassName = `.${titleBarClassName}--align-right`;
    expect(wrapper.find(rightClassName)).to.have.length(1);
  });
});
