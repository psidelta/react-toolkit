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
import RangeSlider from '../../src/RangeSlider';

class FixedPriceSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [25000, 100000]
    };
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <span>
          Price range: ${value[0].toLocaleString()} - ${value[1].toLocaleString()}
        </span>
        <RangeSlider
          value={value}
          onChange={value => this.setState({ value })}
          tickBarPosition="end"
          style={{ width: 450 }}
          startValue={0}
          endValue={500000}
          tickStep={50000}
          step={25000}
          largeStep={50000}
          smallTickStep={25000}
          minRange={25000}
          tooltipVisibility="always"
          renderTooltipContent={(domProps, { tooltipValue }) => (
            <div {...domProps}>{Math.round(tooltipValue / 1000)}K</div>
          )}
          renderTickLabel={(domProps, { tickValue }) => {
            return (
              <div
                {...domProps}
                style={{
                  textAlign: 'center',
                  width: 30,
                  marginLeft: -9
                }}
              >
                {Math.round(tickValue / 1000)}{' '}
                <span style={{ position: 'absolute' }}>K</span>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default <FixedPriceSlider />;
