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

import 'typeface-roboto';

import ToolBar, { Separator } from '../src';
import '../style/index.scss';

global.React = React;
class App extends Component {
  render() {
    return (
      <div
        style={{
          xbackground: '#5e9a2c',
          fontSize: 14,
          fontFamily: 'Roboto',

          // width: 200,
          border: '1px solid magenta',
          boxSizing: 'border-box'
        }}
      >
        <ToolBar>
          <div>xxx</div>
          <div>yyy</div>
        </ToolBar>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
