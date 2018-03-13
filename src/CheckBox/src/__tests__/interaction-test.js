import React from 'react';
import { findDOMNode } from 'react-dom';

import Check from '../CheckBox';
import '../../style/index.scss';

import {
  render,
  simulateMouseEvent,
  simulateKeyboardEvent
} from '../../../common/testUtils';

const CHECKED = 'checked';
const INDETERMINATE = 'indeterminate';
const UNCHECKED = 'UNCHECKED';

describe('Interaction tests', () => {
  it('should not call onClick when disabled', () => {
    let onClickCalled = false;
    const check = render(
      <Check
        disabled
        onClick={() => {
          onClickCalled = true;
        }}
      />
    );

    const node = findDOMNode(check);
    simulateMouseEvent('click', node);
    expect(onClickCalled).to.equal(false);

    check.unmount();
  });

  it('should have pointer-events none', () => {
    const check = render(<Check disabled />);

    const node = findDOMNode(check);
    expect(getComputedStyle(node)['pointer-events']).to.equal('none');
    check.unmount();
  });

  it('should not call onClick when not disabled', () => {
    let onClickCalled = false;
    const check = render(
      <Check
        onClick={() => {
          onClickCalled = true;
        }}
      />
    );

    const node = findDOMNode(check);
    simulateMouseEvent('click', node);
    expect(onClickCalled).to.equal(true);
    check.unmount();
  });

  it('setChecked(indeterminateValue) should not do anything if the checkbox does not support indeterminate state', () => {
    const check = render(
      <Check
        uncheckedIconSrc="unchecked-src-x"
        checkedIconSrc="checked-dummy-src-y"
        indeterminateValue={4}
        defaultChecked={true}
      />
    );

    const node = findDOMNode(check);
    const img = node.querySelector('img');
    expect(img.src).to.contain('/checked-dummy-src-y');
    check.setChecked(4);

    expect(img.src).to.contain('/checked-dummy-src-y');

    check.unmount();
  });
  it('should handle onClick', () => {
    let onClickCalledTimes = 0;
    const clickHandler = () => onClickCalledTimes++;
    const checkbox = render(<Check onClick={clickHandler} />);
    const node = findDOMNode(checkbox);
    simulateMouseEvent('click', node);
    expect(onClickCalledTimes).to.equal(1);
    checkbox.unmount();
  });

  it('should check if space is pressed', () => {
    let onKeyDownCalledTimes = 0;
    const keyDownHandler = () => onKeyDownCalledTimes++;
    const checkbox = render(
      <Check
        onKeyDown={keyDownHandler}
        uncheckedIconSrc="unchecked-dummy-src-x"
        checkedIconSrc="checked-dummy-src-y"
        supportIndeterminate={false}
      />
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    expect(img.src).to.contain('/unchecked-dummy-src-x');
    simulateKeyboardEvent('keydown', node, ' ');
    expect(onKeyDownCalledTimes).to.equal(1);
    expect(img.src).to.contain('/checked-dummy-src-y');
    checkbox.unmount();
  });

  it('should not check if a key different than space is pressed', () => {
    let onKeyDownCalledTimes = 0;
    const keyDownHandler = () => onKeyDownCalledTimes++;
    const checkbox = render(
      <Check
        onKeyDown={keyDownHandler}
        uncheckedIconSrc="unchecked-dummy-src"
        checkedIconSrc="checked-dummy-src"
        supportIndeterminate={false}
      />
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    expect(img.src).to.contain('/unchecked-dummy-src');
    simulateKeyboardEvent('keydown', node, 'Enter');
    expect(onKeyDownCalledTimes).to.equal(1);
    expect(img.src).to.contain('/unchecked-dummy-src');
    checkbox.unmount();
  });

  it('should check on click when component is not controlled', () => {
    const checkbox = render(
      <Check
        checkedIconSrc="checked-dummy-url"
        uncheckedIconSrc="unchecked-dummy-url"
        supportIndeterminate={false}
      />
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    try {
      expect(img.src).to.contain('unchecked-dummy-url');
      simulateMouseEvent('click', node);
      expect(img.src).to.contain('/checked-dummy-url');
    } finally {
      checkbox.unmount();
    }
  });

  it('should check on click on icon when iconCheckOnly is set to `true`', () => {
    let onChangeCallTimes = 0;
    const checkbox = render(
      <Check
        iconCheckOnly={true}
        checkedIconSrc="checked-dummy-url"
        uncheckedIconSrc="unchecked-dummy-url"
        supportIndeterminate={false}
        onChange={() => onChangeCallTimes++}
      />
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    expect(img.src).to.contain('unchecked-dummy-url');
    simulateMouseEvent('click', img);
    expect(img.src).to.contain('/checked-dummy-url');
    expect(onChangeCallTimes).to.equal(1);
    checkbox.unmount();
  });

  it('should not check on click outside icon when iconCheckOnly is set to `true`', () => {
    let onChangeCallTimes = 0;
    const checkbox = render(
      <Check
        iconCheckOnly={true}
        checkedIconSrc="checked-dummy-url"
        uncheckedIconSrc="unchecked-dummy-url"
        onChange={() => onChangeCallTimes++}
        supportIndeterminate={false}
      />
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    expect(img.src).to.contain('unchecked-dummy-url');
    simulateMouseEvent('click', node);
    expect(img.src).to.contain('unchecked-dummy-url');
    expect(onChangeCallTimes).to.equal(0);
    checkbox.unmount();
  });

  it('should check on click when component is not controlled with defaultChecked', () => {
    const checkbox = render(
      <Check
        checkedIconSrc="checked-dummy-url"
        uncheckedIconSrc="unchecked-dummy-url"
        defaultChecked={true}
      />
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    expect(img.src).to.contain('/checked-dummy-url');
    simulateMouseEvent('click', node);
    expect(img.src).to.contain('unchecked-dummy-url');
    checkbox.unmount();
  });

  it('should not go to indeterminate state if supportIndeterminate is false', () => {
    const checkbox = render(
      <Check
        checkedValue={CHECKED}
        uncheckedValue={UNCHECKED}
        supportIndeterminate={false} //checked is undefined!
        checkedIconSrc={CHECKED + '_dummy_src'}
        uncheckedIconSrc={UNCHECKED + '_dummy_src'}
        indeterminateIconSrc={INDETERMINATE + '_dummy_src'}
      />
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    expect(img.src).to.contain(UNCHECKED + '_dummy_src');
    simulateMouseEvent('click', node);
    expect(img.src).to.contain('/' + CHECKED + '_dummy_src');
    checkbox.unmount();
  });

  it('should not change the state to checked when component is controlled (checked = null -> indeterminate)', () => {
    // null is also the value of indeterminate
    const checkbox = render(
      <Check
        checked={null}
        supportIndeterminate
        indeterminateIconSrc="indeterminate-dummy-url"
      />
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    simulateMouseEvent('click', node);
    expect(img.src).to.contain('indeterminate-dummy-url');
    checkbox.unmount();
  });

  it('should not change the state to checked when component is controlled (checked = null -> unchecked*)', () => {
    //null is also the value of indeterminate, but this time, supportIndeterminate is false
    const checkbox = render(
      <Check
        checked={null}
        uncheckedIconSrc="unchecked-dummy-url"
        supportIndeterminate={false}
      />
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    simulateMouseEvent('click', node);
    expect(img.src).to.contain('unchecked-dummy-url');
    checkbox.unmount();
  });

  it('should not change the state to checked when component is controlled (checked = "a string -> unchecked")', () => {
    const checkbox = render(
      <Check
        checked={'a string'}
        uncheckedIconSrc="unchecked-dummy-url"
        indeterminateIconSrc="indeterminate-dummy-url"
      />
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    simulateMouseEvent('click', node);
    expect(img.src).to.contain('unchecked-dummy-url');
    checkbox.unmount();
  });

  it('should call the onChange when component is controlled', () => {
    let onChangedCalledTimes = 0;
    const checkbox = render(
      <Check
        checked={'anything'}
        onChange={() => onChangedCalledTimes++}
        uncheckedIconSrc="unchecked-dummy-url"
        indeterminateIconSrc="indeterminate-dummy-url"
      />
    );
    const node = findDOMNode(checkbox);
    const img = node.querySelector('img');
    simulateMouseEvent('click', node);
    expect(img.src).to.contain('unchecked-dummy-url');
    expect(onChangedCalledTimes).to.equal(1);
    checkbox.unmount();
  });

  it('should apply focused style if available', () => {
    const checkbox = render(
      <Check
        checkedIconSrc="checked-dummy-url"
        uncheckedIconSrc="unchecked-dummy-url"
        defaultChecked={true}
        focusedStyle={{ border: '4px solid red' }}
      />
    );
    const node = findDOMNode(checkbox);

    simulateMouseEvent('click', node);
    simulateMouseEvent('focus', node);
    expect(node.style.border).to.equal('4px solid red');
    checkbox.unmount();
  });

  it('should call the onFocus event if available', () => {
    let onFocusCallTimes = 0;
    const onFocusHandler = () => onFocusCallTimes++;
    const checkbox = render(
      <Check
        checkedIconSrc="checked-dummy-url"
        uncheckedIconSrc="unchecked-dummy-url"
        defaultChecked={true}
        onFocus={onFocusHandler}
      />
    );
    const node = findDOMNode(checkbox);
    simulateMouseEvent('focus', node);
    expect(onFocusCallTimes).to.equal(1);
    checkbox.unmount();
  });

  it('should call the onBlur event if available', () => {
    let onBlurCallTimes = 0;
    const onBlurHandler = () => onBlurCallTimes++;
    const checkbox = render(
      <Check
        checkedIconSrc="checked-dummy-url"
        uncheckedIconSrc="unchecked-dummy-url"
        defaultChecked={true}
        onBlur={onBlurHandler}
      />
    );
    const node = findDOMNode(checkbox);
    simulateMouseEvent('blur', node);
    expect(onBlurCallTimes).to.equal(1);
    checkbox.unmount();
  });

  it('should not change if disabled', () => {
    let onChangeCallTimes = 0;
    let onChangeHandler = () => onChangeCallTimes++;
    const checkbox = render(
      <Check onChange={onChangeHandler} disabled={true} />
    );
    const node = findDOMNode(checkbox);
    simulateMouseEvent('click', node);
    expect(onChangeCallTimes).to.equal(0);
    checkbox.unmount();
  });

  it('should not change if readonly', () => {
    let onChangeCallTimes = 0;
    let onChangeHandler = () => onChangeCallTimes++;
    const checkbox = render(
      <Check onChange={onChangeHandler} readOnly={true} />
    );
    const node = findDOMNode(checkbox);
    simulateMouseEvent('click', node);
    expect(onChangeCallTimes).to.equal(0);
    checkbox.unmount();
  });
});
