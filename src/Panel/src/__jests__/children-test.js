import React from 'react';
import Panel from '../Panel';
import { mount } from 'enzyme';

describe('children', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Panel />);
  });

  it('should render jsx', () => {
    wrapper.setProps({ children: <div id="childrenId" /> });
    expect(wrapper.find('#childrenId')).toHaveLength(1);
  });

  it('should be called when it function with props and state', () => {
    const children = sinon.stub();
    children.returns(<div id="childrenFunctionId" />);
    wrapper.setProps({ id: 'propsId' });
    wrapper.setState({ stateId: 'stateId' });
    wrapper.setProps({ children });

    expect(children.called).toBe(true);
    expect(wrapper.find('#childrenFunctionId')).toHaveLength(1);

    expect(children.args[0][0].id).toEqual('propsId');
    expect(children.args[0][1].stateId).toEqual('stateId');
  });
});
