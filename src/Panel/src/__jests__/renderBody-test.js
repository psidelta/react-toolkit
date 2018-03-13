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
    const renderBody = jest.fn(() => <div id="body" />);
    const wrapper = mount(<Panel renderBody={renderBody} />);

    expect(renderBody).toHaveBeenCalledTimes(1);
    expect(wrapper.find('#body')).toHaveLength(1);
  });

  it('should render what it returns', () => {
    const renderBody = () => <div id="customId" />;
    wrapper.setProps({ renderBody });

    expect(wrapper.find('#customId')).toHaveLength(1);
    expect(wrapper.find(bodyClassName)).toHaveLength(0);
  });

  it('should render default body with mutated domProps', () => {
    const renderBody = domProps => {
      domProps.id = 'mutatedId';
    };
    wrapper.setProps({ renderBody });
    expect(wrapper.find('#mutatedId')).toHaveLength(1);
  });
});
