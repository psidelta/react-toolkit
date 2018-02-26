/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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

    expect(newCollapsedState).to.be.equal(expected);
    expect(wrapper.state().activeNode).to.be.equal(expected);
  });
});
