/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import BasicUploaderExample from './uploader/basic-uploader';
import './index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <BasicUploaderExample />;
  }
}

render(<App />, document.getElementById('content'));
