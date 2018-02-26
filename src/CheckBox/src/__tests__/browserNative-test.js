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

import { render } from '../../../common/testUtils';

describe('BrowserNative', () => {
  it('should render indeterminate when there is custom value', () => {
    const checkbox = render(
      <Check
        supportIndeterminate
        browserNative
        checked={5}
        indeterminateValue={5}
      >
        1
      </Check>
    );
    const node = findDOMNode(checkbox).querySelector('input');
    expect(node.indeterminate).to.equal(true);

    checkbox.rerender(
      <Check
        supportIndeterminate
        browserNative
        checked={'yes'}
        checkedValue="yes"
        indeterminateValue={5}
      />
    );
    expect(node.indeterminate).to.equal(false);
    expect(node.checked).to.equal(true);

    checkbox.unmount();
  });
});
