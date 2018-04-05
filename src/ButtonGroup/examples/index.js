/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import ButtonGroup from '../src';
import Button from '../../Button';
import '../style/index.scss';

let pressedIndex = 0;

class App extends Component {
  render() {
    return (
      <div>
        <h1>Button Group</h1>
        <ButtonGroup
          rtl
          // borderRadius={10}
          keepOnePressed={false}
          // border="1px solid blue"
          defaultPressedIndex={pressedIndex}
          onPressedIndexChange={index => {
            console.log('new pressed index', index);
          }}
          onClick={console.log}
        >
          <Button>bold</Button>
          <Button>italic</Button>
          <Button>default</Button>
        </ButtonGroup>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
