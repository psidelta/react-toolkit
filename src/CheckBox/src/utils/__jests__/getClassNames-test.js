/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
    const expected =
      'zippy-react-toolkit-checkbox zippy-react-toolkit-checkbox--rtl zippy-react-toolkit-checkbox--read-only';

    const className = getClassNames(props);

    expect(className).toContain('zippy-react-toolkit-checkbox');
    expect(className).toContain('zippy-react-toolkit-checkbox--rtl');
    expect(className).toContain('zippy-react-toolkit-checkbox--read-only');
  });
});

describe('Check.props.className', () => {
  it('has correct value in the DOM', () => {
    const checkbox = render(<Check readOnly />);
    const node = findDOMNode(checkbox);

    const className = node.className;

    expect(className).toContain('zippy-react-toolkit-checkbox');
    expect(className).not.toContain('zippy-react-toolkit-checkbox--rtl');
    expect(className).toContain('zippy-react-toolkit-checkbox--read-only');

    checkbox.rerender(<Check />);
    expect(node.className).not.toContain(
      'zippy-react-toolkit-checkbox--read-only'
    );

    checkbox.unmount();
  });
});
