/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TreeView from '../TreeView';
import { shallow } from 'enzyme';

describe('setActiveNode', () => {
  it('should update the active noode', () => {
    const dataSource = [
      {
        label: 'test 1'
      },
      {
        label: 'test 2',
        nodes: [
          {
            label: 'test 3'
          }
        ]
      }
    ];

    const wrapper = shallow(
      <TreeView enableChecked dataSource={dataSource} defaultActiveNode={'1'} />
    );

    const newCollapsedState = wrapper.instance().setActiveNode('1/0');
    const expected = '1/0';

    expect(newCollapsedState).toEqual(expected);
    expect(wrapper.state().activeNode).toEqual(expected);
  });
});
