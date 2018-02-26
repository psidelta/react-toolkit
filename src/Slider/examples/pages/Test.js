import React, { Component } from 'react';

import Slider from '../../src/Slider';
import RangeSlider from '../../src/RangeSlider';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      tickBarPosition: 'end',
      orientation: 'horizontal'
    };
  }
  render() {
    return (
      <div>
        <div style={{ margin: '20px 50px' }}>
          showButtons:{' '}
          <input
            type="checkbox"
            checked={this.state.showButtons}
            onChange={ev => this.setState({ showButtons: ev.target.checked })}
          />{' '}
          | tickBarPosition:{' '}
          <select
            value={this.state.tickBarPosition}
            onChange={ev => this.setState({ tickBarPosition: ev.target.value })}
          >
            <option value="start">start</option>
            <option value="end">end</option>
            <option value="both">both</option>
            <option value="none">none</option>
          </select>{' '}
          | orientation{' '}
          <select
            value={this.state.orientation}
            onChange={ev => this.setState({ orientation: ev.target.value })}
          >
            <option value="horizontal">horizontal</option>
            <option value="vertical">vertical</option>
          </select>
        </div>
        <div style={{ margin: 50 }}>
          <Slider
            tickBarPosition={this.state.tickBarPosition}
            showButtons={this.state.showButtons}
            defaultValue={30}
            orientation={this.state.orientation}
          />
        </div>
        <div style={{ marginLeft: 50 }}>
          <RangeSlider
            tickBarPosition={this.state.tickBarPosition}
            orientation={this.state.orientation}
          />
        </div>
        <div style={{ margin: 50, display: 'inline-flex' }}>
          <Slider
            style={{ marginRight: 50 }}
            tickBarPosition={this.state.tickBarPosition}
            showButtons={this.state.showButtons}
            orientation="vertical"
          />
          <RangeSlider
            orientation="vertical"
            tickBarPosition={this.state.tickBarPosition}
          />
        </div>
      </div>
    );
  }
}

export default Test;
