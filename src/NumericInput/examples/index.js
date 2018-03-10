import React, { Component } from 'react';
import { render } from 'react-dom';

import NumberInput from '../index';
import '../style/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableSpinnerTools: true,
      enableClearButton: true,
      toolPosition: false,
      size: 18,
      value: null,
      disabled: false
    };
  }

  onChange(value) {
    console.log('onChange', value, typeof value);

    this.setState({
      value
    });
  }

  render() {
    return (
      <div className="App" style={{ padding: 50, xbackground: 'antiquewhite' }}>
        <NumberInput
          style={{ width: 100 }}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          wrapperProps={{
            style: {
              xbackground: 'green',
              xborder: '5px solid red',
              borderRadius: 10
            }
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
