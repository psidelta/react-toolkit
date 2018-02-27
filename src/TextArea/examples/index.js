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
