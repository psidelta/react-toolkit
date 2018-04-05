/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { render } from 'react-dom';

import ColorPickerInput from '../src/';
import '../style/index.scss';
import './index.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ColorPickerInput
          colorPickerProps={{ id: 'helloWorld' }}
          // renderCancelButton={(args) => {
          //   console.log(args)
          //   return <div> custom color picker </div>
          // }}
          // expanded
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
