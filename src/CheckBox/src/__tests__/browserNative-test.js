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
