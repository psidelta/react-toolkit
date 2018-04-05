/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import Slider from '../../src/Slider';
import RangeSlider from '../../src/RangeSlider';
import markup from '../../docs/range-slider-basics.md';
import MarkdownPage from './MarkdownPage';

const minMaxRangeSlider = <RangeSlider minRange={20} maxRange={50} />;
const minMaxRangeSliderContraints1 = (
  <RangeSlider key={1} defaultValue={[20, 100]} minRange={20} maxRange={50} />
);
const minMaxRangeSliderContraints2 = (
  <RangeSlider key={2} defaultValue={[30, 40]} minRange={20} maxRange={50} />
);

class RangeSliderProps extends Component {
  render() {
    return (
      <MarkdownPage
        examplesMap={{
          minMaxRangeSlider,
          minMaxRangeSliderContraints1,
          minMaxRangeSliderContraints2
        }}
        markup={markup}
      />
    );
  }
}

export default RangeSliderProps;
