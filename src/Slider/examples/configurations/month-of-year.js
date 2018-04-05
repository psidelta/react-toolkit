/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import Slider from '../../src/Slider';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

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
