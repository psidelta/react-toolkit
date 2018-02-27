import React, { Component } from 'react';
import Slider from '../../src/Slider';
import RangeSlider from '../../src/RangeSlider';
import markup from '../../docs/buttons.md';
import MarkdownPage from './MarkdownPage';

const buttonsExample = <Slider showButtons orientation="vertical" />;
const custonButtonsExample = (
  <Slider showButtons incrementButton={'a'} decrementButton={'b'} />
);

class ButtonProps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MarkdownPage
        examplesMap={{
          buttonsExample,
          custonButtonsExample
        }}
        markup={markup}
      />
    );
  }
}

export default ButtonProps;
