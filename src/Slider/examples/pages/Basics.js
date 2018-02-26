/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';

import Slider from '../../src/Slider';
import RangeSlider from '../../src/RangeSlider';

import markup from '../../docs/basics.md';

import MarkdownPage from './MarkdownPage';

const limitedSlider = <RangeSlider startValue={-100} endValue={100} />;
const limitedSliderInversed = <RangeSlider startValue={100} endValue={-100} />;
const sliderDefaultValue = <Slider defaultValue={35} />;
const rangeSliderDefaultValue = (
  <RangeSlider startValue={300} endValue={200} defaultValue={[250, 220]} />
);
const sliderStep5 = <Slider step={10} defaultValue={50} />;
const sliderLargeStep10 = <Slider largeStep={10} defaultValue={50} />;
const verticalSlider1 = <Slider updateValueOnTrackDrag orientation="vertical" />;

const rtlExample = <Slider rtl />;

class BasicProps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MarkdownPage
        examplesMap={{
          sliderBasic: <Slider />,
          rangeSliderBasic: <RangeSlider />,
          limitedSlider,
          limitedSliderInversed,
          sliderDefaultValue,
          rangeSliderDefaultValue,
          sliderStep5,
          sliderLargeStep10,
          verticalSlider1,
          rtlExample
        }}
        markup={markup}
      />
    );
  }
}

export default BasicProps;
