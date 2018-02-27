import React from 'react';
import { findDOMNode } from 'react-dom';

import RBG from '../RadioButtonGroup';

import { render } from './../testUtils';

const options = [
  {
    value: 'v1',
    label: 'bananas'
  },
  {
    value: 'v2',
    label: 'apples'
  },
  {
    value: 'v3',
    label: 'strawberries'
  },
  {
    value: 'v4',
    label: 'chocolate'
  }
];

describe('Hidden submit rbg', () => {
  it('should be rendered when prop name is provided', () => {
    const rbg = render(<RBG radioOptions={options} name="rbgName" />);
    const node = findDOMNode(rbg);
    const input = node.querySelector('input[name="rbgName"]');
    expect(input.type).to.equal('hidden');
    rbg.unmount();
  });

  it('should not be rendered when prop name is not provided', () => {
    const rbg = render(<RBG radioOptions={options} />); //note there is no name here
    const node = findDOMNode(rbg);
    const input = node.querySelector('input');
    expect(input).to.equal(null);
    rbg.unmount();
  });

  it('should not be rendered when is disabled', () => {
    const rbg = render(<RBG radioOptions={options} name="anyValue" disabled />);
    const node = findDOMNode(rbg);
    const input = node.querySelector('input');
    expect(input).to.equal(null);
    rbg.unmount();
  });

  it('should not render if shouldSubmit prevents this', () => {
    const rbg = render(
      <RBG radioOptions={options} name="validName" shouldSubmit={false} />
    );
    const node = findDOMNode(rbg);
    const input = node.querySelector('input');
    expect(input).to.equal(null);
    rbg.unmount();
  });

  it('should render if shouldSubmit allows this', () => {
    const rbg = render(
      <RBG radioOptions={options} name="validName" shouldSubmit={true} />
    );
    const node = findDOMNode(rbg);
    const input = node.querySelector('input');
    expect(input).not.to.equal(null);
    rbg.unmount();
  });

  it('should not render if shouldSubmit() prevents this', () => {
    const rbg = render(
      <RBG radioOptions={options} name="validName" shouldSubmit={() => false} />
    );
    const node = findDOMNode(rbg);
    const input = node.querySelector('input');
    expect(input).to.equal(null);
    rbg.unmount();
  });

  it('should render if shouldSubmit() allows this', () => {
    const rbg = render(
      <RBG radioOptions={options} name="validName" shouldSubmit={() => true} />
    );
    const node = findDOMNode(rbg);
    const input = node.querySelector('input');
    expect(input).not.to.equal(null);
    rbg.unmount();
  });

  it('should log a warning if showWarnings and shouldSubmit() returns true, but no name provided', () => {
    let thrownMessage;
    const spiedConsoleWarn = function(message) {
      thrownMessage = message;
    };
    if (typeof console !== 'undefined') {
      const originalConsoleWarning = console.warn;
      console.warn = spiedConsoleWarn;
      const rbg = render(
        <RBG radioOptions={options} shouldSubmit={() => true} />
      );
      console.warn = originalConsoleWarning;
      expect(thrownMessage).to.contain(
        'shouldSubmit function returned true, but "name" prop is missing'
      );
      rbg.unmount();
    }
  });

  it('should not log a warning if showWarnings is disabled and shouldSubmit() returns true, but no name provided', () => {
    let errorMessageWasNotLogged = true;
    const spiedConsoleWarn = function(message) {
      errorMessageWasNotLogged = false;
    };
    if (typeof console !== 'undefined') {
      const originalConsoleWarning = console.warn;
      console.warn = spiedConsoleWarn;
      const rbg = render(
        <RBG
          radioOptions={options}
          showWarnings={false}
          shouldSubmit={() => true}
        />
      );
      console.warn = originalConsoleWarning;
      expect(errorMessageWasNotLogged).to.equal(true);
      rbg.unmount();
    }
  });

  it('should throw error if shouldSubmit, but no name provided', () => {
    let thrownMessage;
    const spiedConsoleError = function(message) {
      thrownMessage = message;
    };
    if (typeof console !== 'undefined') {
      const originalConsoleError = console.error;
      console.error = spiedConsoleError;
      const rbg = render(<RBG radioOptions={options} shouldSubmit={true} />);
      console.error = originalConsoleError;
      expect(thrownMessage).to.contain('requires prop "name" to be submitted');
      rbg.unmount();
    }
  });

  it('should throw error if value is provided, as we used radioValue to set the state instead', () => {
    let loggedError;
    const spiedConsoleError = function(message) {
      loggedError = message;
    };
    if (typeof console !== 'undefined') {
      const originalConsoleError = console.error;
      console.error = spiedConsoleError;
      const rbg = render(<RBG radioOptions={options} value="checked" />);
      console.error = originalConsoleError;
      expect(loggedError).to.contain(
        '"value" prop is not supported. Use "radioValue" instead.'
      );
      rbg.unmount();
    }
  });

  it('should throw error if defaultValue is provided, as we used radioValue to set the state instead', () => {
    let loggedError;
    const spiedConsoleError = function(message) {
      loggedError = message;
    };
    if (typeof console !== 'undefined') {
      const originalConsoleError = console.error;
      console.error = spiedConsoleError;
      const rbg = render(<RBG radioOptions={options} defaultValue="checked" />);
      console.error = originalConsoleError;
      expect(loggedError).to.contain(
        '"defaultValue" prop is not supported. Use "defaultRadioValue" instead.'
      );
      rbg.unmount();
    }
  });

  it('should submit empty string instead of null uncheckedValue', () => {
    const rbg = render(
      <RBG radioOptions={options} name="someValue" uncheckedValue={null} />
    );
    const node = findDOMNode(rbg);
    const input = node.querySelector('input');
    expect(input.value).to.equal('');
    rbg.unmount();
  });

  xit('should log a warning if checkedSubmitValue is null', () => {
    if (typeof console !== 'undefined') {
      let thrownMessage;
      const originalConsoleError = console.error;
      const spiedConsoleError = function(message) {
        thrownMessage = message;
        originalConsoleError(message);
      };
      console.error = spiedConsoleError;
      const rbg = render(
        <RBG radioOptions={options} checkedSubmitValue={null} />
      );
      console.error = originalConsoleError;
      expect(thrownMessage).to.contain('checkedSubmitValue is null');
      rbg.unmount();
    }
  });

  xit('should log a warning if uncheckedSubmitValue is null', () => {
    if (typeof console !== 'undefined') {
      let thrownMessage;
      const originalConsoleError = console.error;
      const spiedConsoleError = function(message) {
        thrownMessage = message;
        originalConsoleError(message);
      };
      console.error = spiedConsoleError;
      const rbg = render(
        <RBG radioOptions={options} uncheckedSubmitValue={null} />
      );
      console.error = originalConsoleError;
      expect(thrownMessage).to.contain('uncheckedSubmitValue is null');
      rbg.unmount();
    }
  });

  xit('should log a warning if indeterminateSubmitValue is null', () => {
    if (typeof console !== 'undefined') {
      let thrownMessage;
      const originalConsoleError = console.error;
      const spiedConsoleError = function(message) {
        thrownMessage = message;
        originalConsoleError(message);
      };
      console.error = spiedConsoleError;
      const rbg = render(
        <RBG radioOptions={options} indeterminateSubmitValue={null} />
      );
      console.error = originalConsoleError;
      expect(thrownMessage).to.contain('indeterminateSubmitValue is null');
      rbg.unmount();
    }
  });
});
