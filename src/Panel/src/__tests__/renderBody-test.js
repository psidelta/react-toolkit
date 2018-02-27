import React from 'react';
import Panel from '../Panel';
import { mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const bodyClassName = `.${rootClassName}__body`;

describe('renderBody', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  it('should be caled with domProps and props', () => {
    const renderBody = sinon.spy();
    wrapper.setProps({ id: true });
    wrapper.setProps({ renderBody });

    expect(renderBody.called).to.be.true;
    expect(renderBody.args[0][1].id).to.be.true;
  });

  it('should render what it returns', () => {
    const renderBody = () => <div id="customId" />;
    wrapper.setProps({ renderBody });

    expect(wrapper.find('#customId')).to.have.length(1);
    expect(wrapper.find(bodyClassName)).to.have.length(0);
  });

  it('should render default body with mutated domProps', () => {
    const renderBody = domProps => {
      domProps.id = 'mutatedId';
    };

    wrapper.setProps({ renderBody });
    expect(wrapper.find('#mutatedId')).to.have.length(1);
  });
});
