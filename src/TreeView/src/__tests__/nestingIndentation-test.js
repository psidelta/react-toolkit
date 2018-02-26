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
import Node from '../Node';
import { mount } from 'enzyme';

describe('nestingIndentation', () => {
  it('should add paddingLeft on contentStyle', () => {
    const wrapper = mount(
      <TreeView
        rtl={false}
        dataSource={[
          { label: 'test 1' },
          { label: 'test 2' },
          { label: 'test 3' }
        ]}
      />
    );

    expect(
      wrapper.find(Node).first().props().contentStyle.paddingLeft
    ).to.be.equal(20);
  });

  it('should add padddingRight to contentStyle if rtl', () => {
    const wrapper = mount(
      <TreeView
        rtl
        dataSource={[
          { label: 'test 1' },
          { label: 'test 2' },
          { label: 'test 3' }
        ]}
      />
    );

    expect(
      wrapper.find(Node).first().props().contentStyle.paddingRight
    ).to.be.equal(20);
  });
});
