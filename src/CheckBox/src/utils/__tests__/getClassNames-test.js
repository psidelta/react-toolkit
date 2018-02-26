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

import Check from '../../CheckBox';

import getClassNames from '../getClassNames';
import { render } from '../../testUtils';

const props = {
  rtl: true,
  readOnly: true,
  rootClassName: 'zippy-react-toolkit-checkbox'
};

describe('getClassNames', () => {
  it('builds correct className', () => {
    const expected = 'zippy-react-toolkit-checkbox zippy-react-toolkit-checkbox--rtl zippy-react-toolkit-checkbox--read-only';

    const className = getClassNames(props);

    expect(className).to.contain('zippy-react-toolkit-checkbox');
    expect(className).to.contain('zippy-react-toolkit-checkbox--rtl');
    expect(className).to.contain('zippy-react-toolkit-checkbox--read-only');
  });
});

describe('Check.props.className', () => {
  it('has correct value in the DOM', () => {
    const checkbox = render(<Check readOnly />);
    const node = findDOMNode(checkbox);

    const className = node.className;

    expect(className).to.contain('zippy-react-toolkit-checkbox');
    expect(className).to.not.contain('zippy-react-toolkit-checkbox--rtl');
    expect(className).to.contain('zippy-react-toolkit-checkbox--read-only');

    checkbox.rerender(<Check />);
    expect(node.className).to.not.contain(
      'zippy-react-toolkit-checkbox--read-only'
    );

    checkbox.unmount();
  });
});
