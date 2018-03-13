import React, { Component } from 'react';
import { render } from 'react-dom';

import ColorPalette from '../src/ColorPalette';
import '../style/index.scss';
import './index.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '#FFDC00'
    };
  }
  render() {
    return (
      <div>
        <ColorPalette
          style={{ marginBottom: 10 }}
          value={this.state.value}
          onChange={color => {
            this.setState({ value: color });
          }}
        />
        <ColorPalette
          palette="gray"
          value={this.state.value}
          style={{ marginBottom: 10 }}
          onChange={color => {
            this.setState({ value: color });
          }}
        />
        <ColorPalette
          palette={['#fff', '#abc', '#123']}
          value={this.state.value}
          onChange={color => {
            this.setState({ value: color });
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
