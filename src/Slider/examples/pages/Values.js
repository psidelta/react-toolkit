import React, { Component } from 'react';
import Slider from '../../src/Slider';
import RangeSlider from '../../src/RangeSlider';
import markup from '../../docs/values.md';
import MarkdownPage from './MarkdownPage';

class RangeSliderProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50
    };
  }

  handleChange(value) {
    console.log('change', value);
    this.setState({ value });
  }

  getSlider() {
    return (
      <div>
        <span>Value from slider: {this.state.value}</span>
        <Slider
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }

  render() {
    return (
      <MarkdownPage
        examplesMap={{
          controlledSlider: this.getSlider()
        }}
        markup={markup}
      />
    );
  }
}

export default RangeSliderProps;
