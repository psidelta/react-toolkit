import React, { Component } from 'react';
import { render } from 'react-dom';
import '../style/index.scss';

import RadioButton from '../src/';
import '../style/index.scss';
import './index.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <RadioButton
          browserNative
          iconSize={16}
          iconStyle={{ paddingRight: 3 }}
          children="First"
        />
        <RadioButton
          iconSize={16}
          iconStyle={{ paddingRight: 3 }}
          children="Locked"
          readOnly
        />
        <RadioButton
          iconSize={16}
          iconStyle={{ paddingRight: 3 }}
          children="Last"
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
