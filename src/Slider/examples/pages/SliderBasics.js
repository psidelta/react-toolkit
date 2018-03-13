import React, { Component } from 'react';
import Slider from '../../src/Slider';
import RangeSlider from '../../src/RangeSlider';
import markup from '../../docs/slider-basics.md';
import MarkdownPage from './MarkdownPage';

const trackFillPositionEnd = <Slider trackFillPosition="end" />;
const noFillExample = <Slider noFill />;

class SliderProps extends Component {
  render() {
    return (
      <MarkdownPage
        examplesMap={{
          trackFillPositionEnd,
          noFillExample
        }}
        markup={markup}
      />
    );
  }
}

export default SliderProps;
