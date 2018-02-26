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
import { mount } from 'enzyme';
import Node from '../../Node';

describe('node.icon', () => {
  it('should render jsx', () => {
    const wrapper = mount(
      <Node node={{ label: 'test', icon: <div id="customIcon" /> }} />
    );
    expect(wrapper.find('#customIcon')).to.have.length(1);
  });
  it('should render what it return when it is a function', () => {
    const wrapper = mount(
      <Node
        index={20}
        node={{
          label: 'test',
          icon: ({ index }) => <div id={`test-${index}`} />
        }}
      />
    );

    expect(wrapper.find('#test-20')).to.have.length(1);
  });
});
