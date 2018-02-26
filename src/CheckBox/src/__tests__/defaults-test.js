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
      <Check checkedIconSrc="checked-dummy-url" defaultChecked={true}>
        2
      </Check>
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
