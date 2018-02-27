import React, { Component } from 'react';
import Slider from '../../src/Slider';
import RangeSlider from '../../src/RangeSlider';
import markup from '../../docs/examples.md';
import MarkdownPage from './MarkdownPage';

import styledHandlerSlide from '../configurations/styled-handler-slide';
import fixedPrices from '../configurations/fixed-prices';
import monthOfYear from '../configurations/month-of-year';

class ExamplesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MarkdownPage
        examplesMap={{
          styledHandlerSlide,
          fixedPrices,
          monthOfYear
        }}
        markup={markup}
      />
    );
  }
}

export default ExamplesPage;
