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
