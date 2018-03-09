import React from 'react';
import Menu from '../Menu';
import { mount } from 'enzyme';
import '../../style/index.scss';

const ROOT_CLASS = Menu.defaultProps.rootClassName;

describe('autoFocus', () => {
  xit('it should have focus after it was rendered', done => {
    const component = mount(<Menu autoFocus items={[{ label: 'test' }]} />);

    expect(document.activeElement).toBe(<div />);
    expect(
      component
        .find('.zippy-react-toolkit-menu')
        .matchesElement(document.activeElement)
    ).toBe(true);
  });
});
