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

import TextArea from '../src';
import NumericInput from '../../NumericInput';
import '../style/index.scss';
import '../../NumericInput/style/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableSpinnerTools: true,
      enableClearButton: true,
      toolPosition: false,
      size: 18,
      theValue: 'abc',
      value: 68,
      rtl: false,
      disabled: false
    };
  }

  onChange(value) {
    this.setState({
      value
    });
  }

  render() {
    return (
      <div className="App" style={{ padding: 30 }}>
        <h1>TextArea configurator</h1>
        <div style={{ marginBotton: 20 }}>
          <div style={{ marginBottom: 10 }}>
            rtl:
            <input
              type="checkbox"
              checked={this.state.rtl}
              onChange={ev => this.setState({ rtl: ev.target.checked })}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            disabled:
            <input
              type="checkbox"
              checked={this.state.disabled}
              onChange={ev => this.setState({ disabled: ev.target.checked })}
            />
          </div>
        </div>
        <div>
          <TextArea
            disabled={this.state.disabled}
            rtl={this.state.rtl}
            rows={14}
            value={this.state.theValue}
            onChange={v => {
              this.setState({
                theValue: v
              });
            }}
            onFocus={() => {
              console.warn('focused');
            }}
            stopChangePropagation={false}
          />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
