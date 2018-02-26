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
