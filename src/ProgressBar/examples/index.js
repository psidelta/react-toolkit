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

import React from 'react';
import { render } from 'react-dom';
import ProgressBar from '../src';
import './index.scss';

var VALUE = 0;
var IND = true;
var paused = false;

class App extends React.Component {
  constructor(props) {
    super(props);

    window.up = this.setState;
    window.goCrazy = this.goCrazy;
    window.justGo = this.justGo;
    window.stop = this.stop;
    window.go = this.go;

    this.state = {
      value: 20,
      up: true
    };
  }

  goCrazy() {
    this.setState({
      value: Math.random() * 100
    });

    if (!this.state.stop) {
      setTimeout(() => this.goCrazy(), 100);
    }
  }

  justGo() {
    if (this.state.up) {
      this.setState({
        value: ++this.state.value
      });
    } else {
      this.setState({
        value: --this.state.value
      });
    }

    if (this.state.value > 100) {
      this.setState({
        up: false
      });
    }

    if (this.state.value < 0) {
      this.setState({
        up: true
      });
    }

    if (!this.state.stop) {
      setTimeout(() => this.justGo(), 300);
    }
  }

  stop() {
    this.setState({
      stop: true
    });
  }

  go() {
    this.setState({
      stop: false
    });
  }

  render() {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <code style={{ marginTop: 10 }}>labelFillColor=rgb(145, 198, 251)</code>
        <ProgressBar labelPosition="start" value={this.state.value} />
        <code style={{ marginTop: 10 }}>labelFillColor=rgb(228, 255, 178)</code>
        <ProgressBar
          labelPosition="start"
          value={this.state.value}
          labelFillColor={'rgb(228, 255, 178)'}
        />
        <code style={{ marginTop: 10 }}>
          labelRemainingColor=rgb(75, 204, 36)
        </code>
        <ProgressBar
          value={this.state.value}
          labelRemainingColor={'rgb(75, 204, 36)'}
        />
        <code style={{ marginTop: 10 }}>
          labelRemainingColor=rgb(163, 53, 241)
        </code>
        <ProgressBar value={this.state.value} />
        <input
          type="number"
          style={{ position: 'fixed', top: 1, right: 0, zIndex: 100 }}
          onChange={event =>
            this.setState({ value: parseFloat(event.target.value) })}
        />

        <h3>indeterminate</h3>
        <ProgressBar
          renderStep={({ domProps, index, value }) => {
            console.log(value);
            // domProps.style.background = 'red';
          }}
          value={this.state.value}
          step={args => {
            // console.log(args);
            return 10;
          }}
          // tickStyle={{ background: 'red' }}
          showTicks
          showSteps
        />

        <h3> indeterminate </h3>
        <ProgressBar
          value={this.state.value}
          indeterminate
          orientation="vertical"
          indeterminateBarStyle={{ background: 'red' }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
