import React from 'react';
import { findDOMNode } from 'react-dom';

import render from '../../common/testUtils';
import { Flex, Item } from './index';
import '../style/index.scss';

const getStyle = instance => getComputedStyle(findDOMNode(render(instance)));

describe('Flex', () => {
  it('props.row should apply flex-flow: row', () => {
    const style = getStyle(<Flex row flex={2} />);

    expect(style.flexGrow).to.equal('2');
    expect(style.flexFlow).to.equal('row wrap');
  });
  it('props.column should apply flex-flow: column', () => {
    const style = getStyle(<Flex wrap={false} column />);

    expect(style.flexGrow).to.equal('0');
    expect(style.flexFlow).to.equal('column nowrap');
  });

  it('props.alignItems should be applied correctly', () => {
    const style = getStyle(<Flex alignItems="end" />);

    expect(style.alignItems).to.equal('flex-end');
  });

  it('should accept className', () => {
    const instance = findDOMNode(render(<Flex className="xxx" />));

    expect(instance.className).to.contain('xxx');
  });

  it('should accept style', () => {
    const style = getStyle(<Flex style={{ marginLeft: 1 }} />);

    expect(style.marginLeft).to.equal('1px');
  });
});

describe('Item', () => {
  it('should default to flex 1', () => {
    const style = getStyle(<Item />);

    expect(style.flexGrow).to.equal('1');
  });

  it('should accept className', () => {
    const instance = findDOMNode(render(<Item className="xxx" />));

    expect(instance.className).to.contain('xxx');
  });

  it('should accept style', () => {
    const style = getStyle(<Item style={{ marginLeft: 1 }} />);

    expect(style.marginLeft).to.equal('1px');
  });
});
