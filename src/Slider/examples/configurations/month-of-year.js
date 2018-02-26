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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const style = (
  <style>
    {`.animated-slide .react-slide__handle {
      transition: all .2s ease-in-out;
    }`}
  </style>
);

class MonthOfYear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        {style}
        <Slider
          className="animated-slide"
          value={value}
          onChange={value => this.setState({ value })}
          noFill
          style={{ width: 450 }}
          startValue={0}
          endValue={11}
          tickStep={1}
          step={1}
          largeStep={2}
          smallTickStep={1}
          renderTickLabel={(domProps, { tickValue }) => {
            return <div {...domProps}>{months[tickValue]}</div>;
          }}
        />
      </div>
    );
  }
}

export default <MonthOfYear />;
