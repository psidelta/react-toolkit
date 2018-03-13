import React from 'react';
import Menu from '../Menu';
import renderIntoDOM from './renderIntoDOM';

import '../../style/index.scss';

const ROOT_CLASS = Menu.defaultProps.rootClassName;

describe('visible', () => {
  it(`should have ${ROOT_CLASS}--hidden className`, () => {
    const { wrapper, wrapperNode, unmount } = renderIntoDOM(
      <Menu visible={false} items={[{ label: 'test' }]} />
    );
    expect(wrapperNode.classList.contains(`${ROOT_CLASS}--hidden`)).to.be.true;
    unmount();
  });

  it('visible=false should have computed style of visibility = hidden', () => {
    const { wrapper, wrapperNode, unmount } = renderIntoDOM(
      <Menu visible={false} items={[{ label: 'test' }]} />
    );
    expect(getComputedStyle(wrapperNode).visibility).to.be.equal('hidden');
    unmount();
  });

  it('visible=false should have computed style of visibility = true', () => {
    const { wrapper, wrapperNode, unmount } = renderIntoDOM(
      <Menu visible={true} items={[{ label: 'test' }]} />
    );
    expect(getComputedStyle(wrapperNode).visibility).to.be.equal('visible');
    unmount();
  });
});
