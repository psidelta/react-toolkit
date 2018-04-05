/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import MaskedInput from '.././src/MaskedInput';

import '../style/index.scss';
//import './index.css';

const hexCodeDefinitions = {
  '#': undefined,
  h: /[A-F0-5]/
};

class App extends React.Component {
  render() {
    return (
      <div>
        <h3>#hhhhhh mask with h definition = A-F0-5.</h3>
        <MaskedInput mask="#hhhhhh" maskDefinitions={hexCodeDefinitions} />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
