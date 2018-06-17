import React, { Component } from 'react';
import { render } from 'react-dom';
import Ripple from '../src';
import '../style/index.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: null,
      wave: false
    };

    this.onMouseDownHandle = this.onMouseDownHandle.bind(this);
  }

  onMouseDownHandle(event) {
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const position = {
      top: event.clientY - rect.top,
      left: event.clientX - rect.left
    };

    this.setState({
      position,
      wave: true
    });
  }

  render() {
    let ripple;

    if (this.state.wave) {
      ripple = (
        <Ripple
          tabIndex={1}
          wave={this.state.wave}
          position={this.state.position}
          onStop={() => {
            this.setState({
              wave: false
            });
          }}
          size={100}
          waveDuration={3000}
        />
      );
    }

    return (
      <div style={{ margin: 50 }}>
        <h2>Ripple</h2>
        <div
          style={{
            border: '1px solid red',
            position: 'relative',
            overflow: 'hidden',
            width: 300,
            height: 200,
            background: 'green'
          }}
          onMouseDown={this.onMouseDownHandle}
        >
          {ripple}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
