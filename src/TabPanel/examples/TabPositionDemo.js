/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import TabPanel from '../src';
import { Flex, Item } from '../../Flex';

const render = (position, props = {}) => {
  const upper = position.toUpperCase();

  const style = {
    ...props.style,
    height: 200
  };

  return (
    <TabPanel tabPosition={position} {...props} style={style}>
      <div tabTitle={`yes ${upper} - first tab`}>
        Lorem ipsum Exercitation ut dolore.
      </div>

      <div
        tabTitle={
          <div>
            {upper} <br /> with icon
          </div>
        }
      >
        Lorem ipsum Exercitation ut dolore.
      </div>

      <div tabTitle={'icon here'}>Lorem ipsum Exercitation ut dolore.</div>
    </TabPanel>
  );
};

export default class TabPositionDemo extends Component {
  render() {
    return (
      <div {...this.props}>
        <Flex row wrap={false} alignItems="start">
          {render('top', { style: { marginRight: 20 } })}
          {render('right', {})}
        </Flex>

        <Flex style={{ marginTop: 20 }} row wrap={false} alignItems="start">
          {render('bottom', { style: { marginRight: 20 } })}
          {render('left', {})}
        </Flex>
      </div>
    );
  }
}
