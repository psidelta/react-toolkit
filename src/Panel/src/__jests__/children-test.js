/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
    const children = jest.fn(() => <div id="childrenFunctionId" />);
    wrapper.setProps({ id: 'propsId' });
    wrapper.setState({ stateId: 'stateId' });
    wrapper.setProps({ children });

    expect(children).toHaveBeenCalled();
    expect(wrapper.find('#childrenFunctionId')).toHaveLength(1);

    expect(children.mock.calls[0][0].id).toEqual('propsId');
    expect(children.mock.calls[0][1].stateId).toEqual('stateId');
  });
});
