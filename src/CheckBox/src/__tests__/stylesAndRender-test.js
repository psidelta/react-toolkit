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

describe('Styles and render', () => {
  it('should use a custom renderIcon function', () => {
    const uncheckedIcon = () => <span>valid JSX</span>;
    const checkbox = render(<Check uncheckedIcon={uncheckedIcon}>hello</Check>);
    const node = findDOMNode(checkbox);
    const img = node.querySelector('span');
    expect(img.innerHTML).to.equal('valid JSX');
    checkbox.unmount();
  });

  it('should use a custom renderIcon JSX with valid style', () => {
    const uncheckedIcon = (
      <span style={{ border: 'red', color: 'yellow' }}>valid JSX</span>
    );
    const checkbox = render(<Check uncheckedIcon={uncheckedIcon}>hello</Check>);
    const node = findDOMNode(checkbox);
    const img = node.querySelector('span');
    expect(img.innerHTML).to.equal('valid JSX');
    expect(img.style.color).to.equal('yellow');
    expect(img.style.border).to.equal('red');
    checkbox.unmount();
  });

  it('should use a custom renderIcon JSX with empty style', () => {
    const uncheckedIcon = <span style={{}}>valid JSX</span>;
    const checkbox = render(<Check uncheckedIcon={uncheckedIcon}>hello</Check>);
    const node = findDOMNode(checkbox);
    const img = node.querySelector('span');
    expect(img.innerHTML).to.equal('valid JSX');
    checkbox.unmount();
  });

  it('should use custom icon size', () => {
    const checkbox = render(
      <Check uncheckedIconSrc="dummy-icon" iconSize={[30, 60]}>hello</Check>
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    expect(img.style.width).to.equal('30px');
    expect(img.style.height).to.equal('60px');
    checkbox.unmount();
  });

  it('should apply readOnlyClassName correctly', () => {
    const checkbox = render(
      <Check readOnly readOnlyClassName={'cls-onlyread'}>hello</Check>
    );
    const node = findDOMNode(checkbox);
    expect(node.className).to.contain('cls-onlyread');
    checkbox.unmount();
  });

  it('should apply disabledClassName correctly', () => {
    const checkbox = render(
      <Check disabled disabledClassName={'dsbld'}>hello</Check>
    );
    const node = findDOMNode(checkbox);
    expect(node.className).to.contain('dsbld');
    checkbox.unmount();
  });

  it('should apply iconClassName correctly', () => {
    const checkbox = render(<Check iconClassName="simple-icon">hello</Check>);
    const found = !!findDOMNode(checkbox).querySelector('.simple-icon');
    expect(found).to.equal(true);
    checkbox.unmount();
  });

  it('should take the iconClassName if available', () => {
    const checkbox = render(
      <Check
        uncheckedIconSrc="unchecked-dummy-url"
        iconClassName="testClassName"
      >
        hello
      </Check>
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    expect(img.className).to.equal('testClassName');
    checkbox.unmount();
  });

  it('should not have tabIndex if disabled', () => {
    const checkbox = render(
      <Check
        uncheckedIconSrc="unchecked-dummy-url"
        disabled={true}
        tabIndex={1}
      >
        hello
      </Check>
    );
    const node = findDOMNode(checkbox);
    expect(node.tabIndex).to.equal(-1);
    checkbox.unmount();
  });

  it('should have tabIndex 0 if is not disabled', () => {
    const checkbox = render(<Check uncheckedIconSrc="dummy-icon" />);
    const node = findDOMNode(checkbox);
    expect(node.tabIndex).to.be.equal(0);
    checkbox.unmount();
  });

  it(
    'should have tabIndex if is not disabled, and there are no child elements',
    () => {
      const checkbox = render(
        <Check uncheckedIconSrc="dummy-icon" tabIndex={1} />
      );
      const node = findDOMNode(checkbox);
      expect(node.tabIndex).to.be.equal(1);
      checkbox.unmount();
    }
  );

  it('should apply a custom disabledStyle if provided', () => {
    const checkbox = render(
      <Check
        uncheckedIconSrc="dummy-icon"
        disabled={true}
        disabledStyle={{ color: 'magenta', border: '1px solid yellow' }}
      />
    );
    const node = findDOMNode(checkbox);
    expect(node.style.color).to.equal('magenta');
    expect(node.style.border).to.equal('1px solid yellow');
    checkbox.unmount();
  });

  it('should apply a custom readonlyStyle if provided', () => {
    const checkbox = render(
      <Check
        uncheckedIconSrc="dummy-icon"
        readOnly={true}
        readOnlyStyle={{ color: 'magenta', border: '1px solid yellow' }}
      />
    );
    const node = findDOMNode(checkbox);
    expect(node.style.color).to.equal('magenta');
    expect(node.style.border).to.equal('1px solid yellow');
    checkbox.unmount();
  });
});
