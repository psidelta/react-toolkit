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

import NumberField from '../src/NumberInput';
import '../style/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <div className="App" style={{ padding: 10 }}>
        <NumberField
          defaultValue={'30'}
          ref={ref => (this.numberInput = ref)}
          allowFloat={false}
          onKeyDown={e => {
            console.log(e.key);
          }}
        />
        <button
          onMouseDown={event => {
            event.preventDefault();
            event.stopPropagation();
            this.numberInput.startSpin(1, {
              step: 0.1
            });
          }}
          onMouseUp={event => {
            event.preventDefault();
            event.stopPropagation();
            this.numberInput.stopSpin();
          }}
        >
          +0.1
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault();
            event.stopPropagation();
            this.numberInput.startSpin(1, {
              step: 1
            });
          }}
          onMouseUp={event => {
            event.preventDefault();
            event.stopPropagation();
            this.numberInput.stopSpin();
          }}
        >
          +1
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault();
            event.stopPropagation();
            this.numberInput.startSpin(1, {
              step: 10
            });
          }}
          onMouseUp={event => {
            event.preventDefault();
            event.stopPropagation();
            this.numberInput.stopSpin();
          }}
        >
          +10
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault();
            event.stopPropagation();
            this.numberInput.startSpin(1, {
              step: -0.1
            });
          }}
          onMouseUp={event => {
            event.preventDefault();
            event.stopPropagation();
            this.numberInput.stopSpin();
          }}
        >
          -0.1
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault();
            event.stopPropagation();
            this.numberInput.startSpin(1, {
              step: -1
            });
          }}
          onMouseUp={event => {
            event.preventDefault();
            event.stopPropagation();
            this.numberInput.stopSpin();
          }}
        >
          -1
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault();
            event.stopPropagation();
            this.numberInput.startSpin(1, {
              step: -10
            });
          }}
          onMouseUp={event => {
            event.preventDefault();
            event.stopPropagation();
            this.numberInput.stopSpin();
          }}
        >
          -10
        </button>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
