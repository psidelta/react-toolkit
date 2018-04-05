/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { render } from 'react-dom';

import ColorTextInput from '../src/';
import '../style/index.scss';
import './index.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ColorTextInput defaultValue="red" />
        <p> rtl </p>
        <ColorTextInput rtl />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
