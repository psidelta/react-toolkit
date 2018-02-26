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

const dataSource = [
  { label: 'test 1' },
  {
    label: 'test 2',
    nodes: [{ label: 'test 3' }]
  }
];

describe('setSelected', () => {
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(
      <TreeView
        enableSelection
        defaultSelected={{ '0': true }}
        dataSource={dataSource}
      />
    );

    const newSelectedState = wrapper
      .instance()
      .setSelected({ '1': true, '1/0': true });
    const expected = { '1': true, '1/0': true };

    expect(newSelectedState).to.deep.equal(expected);
    expect(wrapper.state().selected).to.deep.equal(expected);
  });
});

describe('selectNode', () => {
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(
      <TreeView enableSelection dataSource={dataSource} />
    );
    const newCheckedState = wrapper.instance().selectNode('1');
    const expected = { '1': true };

    expect(newCheckedState).to.deep.equal(expected);
    expect(wrapper.state().selected).to.deep.equal(expected);
  });
});

describe('deselectNode', () => {
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(
      <TreeView
        defaultSelected={{ '1': 'true' }}
        enableSelection
        dataSource={dataSource}
      />
    );
    const newCheckedState = wrapper.instance().deselectNode('1');
    const expected = {};

    expect(newCheckedState).to.deep.equal(expected);
    expect(wrapper.state().selected).to.deep.equal(expected);
  });
});

describe('selectAll', () => {
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(
      <TreeView enableSelection dataSource={dataSource} />
    );
    const test = wrapper.instance().selectAll();
    const expected = {
      '0': true,
      '1': true,
      '1/0': true
    };
    expect(test).to.deep.equal(expected);
    expect(wrapper.state().selected).to.deep.equal(expected);
  });
});

describe('deselectAll', () => {
  it('should return and have correct new selected state', () => {
    const wrapper = shallow(
      <TreeView
        defaultSelected={{ '1': true }}
        enableSelection
        dataSource={dataSource}
      />
    );
    const test = wrapper.instance().deselectAll();
    const expected = {};
    expect(test).to.deep.equal(expected);
    expect(wrapper.state().selected).to.deep.equal(expected);
  });
});
