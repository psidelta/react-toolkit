/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TreeView from '../TreeView';
import { shallow } from 'enzyme';

describe('loading', () => {
  it('should render load mask when loading is true', () => {
    const wrapper = shallow(<TreeView dataSource={[]} loading />);
    expect(wrapper.text()).toEqual('Loading...');
  });
  it('should call renderLoader if loading and render what it returns', () => {
    const renderLoader = jest.fn(() => <div id="customLoader" />);
    const wrapper = shallow(
      <TreeView renderLoader={renderLoader} dataSource={[]} loading />
    );
    expect(renderLoader).toHaveBeenCalled();
    expect(wrapper.find('#customLoader')).toHaveLength(1);
  });
});
