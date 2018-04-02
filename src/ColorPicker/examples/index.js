import '../style/index.scss';

import React from 'react';
import { render } from 'react-dom';
import autoBind from '@zippytech/react-class/autoBind';
import ColorPicker from '../src';
import ColorPalette from '../../ColorPalette';
import ColorPickerInput from '../../ColorPickerInput';
import ColorTextInput from '../../ColorTextInput';

import '../style/index.scss';
import '../../ColorPalette/style/index.scss';
import '../../ColorPickerInput/style/index.scss';
import '../../ColorTextInput/style/index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      color: '#1b3f9c'
    };
  }

  onChange(stringColor, color) {
    this.setState({
      color
      // stringColor
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 20 }}>
          <h3>ColorPicker</h3>
          <ColorPicker />
        </div>
        <div style={{ marginBottom: 40 }}>
          <h3>ColorPalette</h3>
          <ColorPalette />
        </div>
        <div style={{ marginBottom: 40 }}>
          <h3>ColorPickerInput</h3>
          <ColorPickerInput />
        </div>
        <div style={{ marginBottom: 20 }}>
          <h3>ColorTextInput</h3>
          <ColorTextInput />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
