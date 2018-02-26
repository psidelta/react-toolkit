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
import { findDOMNode } from 'react-dom';

import Check from '../CheckBox';

import { render, simulateMouseEvent } from '../../../common/testUtils';

describe('Default values', () => {
  it('should render unchecked by default', () => {
    const checkbox = render(
      <Check uncheckedIconSrc="unchecked-dummy-url">1</Check>
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    expect(img.src).to.contain('unchecked-dummy-url');
    checkbox.unmount();
  });

  it('should be able to set defaultChecked', () => {
    const checkbox = render(
      <Check checkedIconSrc="checked-dummy-url" defaultChecked={true}>2</Check>
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    expect(img.src).to.contain('/checked-dummy-url');
    checkbox.unmount();
  });

  it('should prioritize checked over defaultChecked', () => {
    const checkbox = render(
      <Check
        uncheckedIconSrc="unchecked-dummy-url"
        uncheckedIconSrc="checked-dummy-url"
        defaultChecked={true}
        checked={false}
      >
        3
      </Check>
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    expect(img.src).to.contain('/checked-dummy-url');
    checkbox.unmount();
  });
});
