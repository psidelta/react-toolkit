import React from 'react';
import Menu from '../Menu';
import renderIntoDOM from './renderIntoDOM';

import '../../style/index.scss';

const ROOT_CLASS = Menu.defaultProps.rootClassName;

describe('autoFocus', () => {
  it('it should have focus after it was rendered', done => {
    const { wrapper, wrapperNode, unmount } = renderIntoDOM(
      <Menu autoFocus items={[{ label: 'test' }]} />
    );

    setTimeout(() => {
      expect(wrapperNode).to.be.equal(document.activeElement);
      done();
    }, 300);
  });
});
