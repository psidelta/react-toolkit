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
import { render } from 'react-dom';
import Checkbox from '../src';

import style from './index.scss';

var checked = true;

function nextValue(value, oldValue, info) {
  if (oldValue === 1) {
    //from checked to indeterminate
    return 0;
  }

  if (oldValue === 0) {
    //from  indeterminate to unchecked
    return -1;
  }

  if (oldValue === -1) {
    return 0;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: -1
    };
  }

  onChange(value, event) {
    console.log('onChange', event, value);
    this.setState({ checked: value });
  }

  render() {
    function focus() {
      console.log('focused');
    }

    const { checked } = this.state;

    return (
      <form className="App" style={{ padding: 20 }}>
        <Checkbox supportIndeterminate onFocus={focus}>
          test
        </Checkbox>
        <Checkbox supportIndeterminate onFocus={focus} focusable={false}>
          test
        </Checkbox>
        <Checkbox supportIndeterminate onFocus={focus} checked={true}>
          test
        </Checkbox>
        <Checkbox supportIndeterminate onFocus={focus} checked={null}>
          test
        </Checkbox>
      </form>
    );
  }
}

render(<App />, document.getElementById('content'));
