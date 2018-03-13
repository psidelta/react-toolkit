import React, { Component } from 'react';
import { render } from 'react-dom';

import NumberInput from '../index';
import TextInput from '../../TextInput';
import MaskedInput from '../../MaskedInput';
import ComboBox from '../../ComboBox';
import { DateInput } from '../../Calendar';
import '../../Calendar/style/index.scss';
import '../../ComboBox/style/index.scss';
import '../../MaskedInput/style/index.scss';
import '../../TextInput/style/index.scss';
import '../style/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableSpinnerTools: true,
      enableClearButton: true,
      toolPosition: false,
      size: 10,
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
      <div className="App" style={{ padding: 50 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid red',
            height: 32
          }}
        >
          <TextInput
            style={{ marginRight: 5, width: 200 }}
            placeholder="text"
          />
          <MaskedInput style={{ marginRight: 5 }} placeholder="masked" />
          <DateInput style={{ marginRight: 5 }} />
          <ComboBox
            dataSource={[{ id: 1, label: 'x' }]}
            idProperty="id"
            inlineFlex
            style={{ marginRight: 5 }}
          />
        </div>
        <br />
        <br />
        <div>
          <input
            type="number"
            value={this.state.size}
            onChange={ev => this.setState({ size: ev.target.value })}
          />arrowSize
        </div>
        <NumberInput
          style={{ minWidth: 100 }}
          precision={3}
          // arrowSize={this.state.size * 1}
          placeholder="number"
          initialStep={1000}
          step={50}
          minValue={0}
          maxValue={11150}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
