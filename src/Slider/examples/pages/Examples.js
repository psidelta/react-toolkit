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
