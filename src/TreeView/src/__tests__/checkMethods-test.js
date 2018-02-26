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

describe('checkNode', () => {
  it('should return and have correct new collapsed state', () => {
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

    const wrapper = shallow(<TreeView enableChecked dataSource={dataSource} />);
    const newCheckedState = wrapper.instance().checkNode('1');
    const expected = { '1': true, '1/0': true };

    expect(newCheckedState).to.deep.equal(expected);
    expect(wrapper.state().checked).to.deep.equal(expected);
  });
});

describe('uncheckNode', () => {
  it('should return and have correct new collapsed state', () => {
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
      <TreeView
        enableChecked
        dataSource={dataSource}
        defaultChecked={{ '1': true, '0': true }}
      />
    );
    const newCheckedState = wrapper.instance().uncheckNode('1');
    const expected = { '0': true };

    expect(newCheckedState).to.deep.equal(expected);
    expect(wrapper.state().checked).to.deep.equal(expected);
  });
});

describe('checkAll', () => {
  const dataSource = [
    { label: 'test 1' },
    {
      label: 'test 2',
      nodes: [{ label: 'test 3' }]
    }
  ];
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(<TreeView enableChecked dataSource={dataSource} />);
    const test = wrapper.instance().checkAll();
    const expected = {
      '0': true,
      '1': true,
      '1/0': true
    };
    expect(test).to.deep.equal(expected);
    expect(wrapper.state().checked).to.deep.equal(expected);
  });
});

describe('uncheckAll', () => {
  const dataSource = [
    { label: 'test 1' },
    {
      label: 'test 2',
      nodes: [{ label: 'test 3' }]
    }
  ];
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(<TreeView enableChecked dataSource={dataSource} />);
    const test = wrapper.instance().uncheckAll();
    const expected = {};
    expect(test).to.deep.equal(expected);
    expect(wrapper.state().checked).to.deep.equal(expected);
  });
});
