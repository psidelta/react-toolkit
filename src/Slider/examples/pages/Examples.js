/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
