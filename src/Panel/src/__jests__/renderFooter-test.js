/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Panel from '../Panel';
import { shallow, mount } from 'enzyme';

const rootClassName = Panel.defaultProps.rootClassName;
const bodyClassName = `.${rootClassName}__body`;

xdescribe('renderFooter', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Panel />);
  });

  it('should be called with props', () => {
    const renderFooter = jest.fn(() => <div id="footer" />);
    const wrapper = mount(<Panel renderFooter={renderFooter} />);

    expect(renderFooter).toHaveBeenCalledTimes(1);
    expect(wrapper.find('#footer')).toHaveLength(1);
  });

  it('should render what it returns', () => {
    const renderFooter = () => <div id="customFooterId" />;
    wrapper.setProps({ renderFooter });

    expect(wrapper.find('#customFooterId')).toHaveLength(1);
  });

  it('should be rendered after body', () => {
    const renderFooter = () => <div id="customFooterId" />;
    wrapper.setProps({ renderFooter });

    /**
     * 0 - title
     * 1 - body
     * 2 - footer
     */

    expect(wrapper.childAt(2).props().id).toEqual('customFooterId');
  });
});
