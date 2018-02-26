import React, { Component } from 'react';
import { render } from 'react-dom';

import LoadMask from '../src';
import '../style/index.scss';

class App extends Component {
  render() {
    return (
      <div>
        <div style={{ position: 'relative', height: 300 }}>
          hello <input />
          <LoadMask svgLoader={true} />
        </div>
      </div>
    );
  }
}
render(<App />, document.getElementById('content'));
