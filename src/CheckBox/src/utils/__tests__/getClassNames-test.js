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
