/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import Slider from '../../src/Slider';
import RangeSlider from '../../src/RangeSlider';
import markup from '../../docs/ticks.md';
import MarkdownPage from './MarkdownPage';

const noTickLabels = <RangeSlider tickLabels={false} />;
const tickStepExample = (
  <RangeSlider tickStep={8} startValue={-7} endValue={17} />
);
const tickStepExample2 = (
  <RangeSlider tickStep={8} startValue={0} endValue={68} />
);
const smallTickStepExample = (
  <RangeSlider style={{ width: 500 }} tickStep={10} smallTickStep={5} />
);
const customTicksExample = (
  <RangeSlider
    style={{ width: 500 }}
    ticks={[
      { value: 0, type: 'big' },
      { value: 17, type: 'small' },
      37,
      49,
      { value: 88, type: 'big' }
    ]}
  />
);

const tickStyleExample = (
  <Slider
    tickStyle={{
      backgroundColor: 'lightgreen',
      boxShadow: '0 0 1px 1px rgba(0,255,0,.3)'
    }}
  />
);
const noTicksExample = <Slider tickBarPosition="none" />;

// https://material.io/icons/#ic_replay
const customIcon = (
  <svg fill="#000000" height="32" viewBox="0 0 24 24" width="32">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
  </svg>
);

const customLabelExample = (
  <Slider
    renderTickLabel={(domProps, { tickValue }) => (
      <div
        {...domProps}
        style={{ width: 32, position: 'relative', marginLeft: -10 }}
      >
        {customIcon}
        <span
          style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            height: '24px',
            width: '22px',
            margin: 'auto',
            textAlign: 'center',
            lineHeight: '24px',
            fontSize: '8px',
            fontWeight: 'bold'
          }}
        >
          {tickValue}
        </span>
      </div>
    )}
  />
);

class TicksProps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MarkdownPage
        examplesMap={{
          noTickLabels,
          tickStepExample,
          tickStepExample2,
          smallTickStepExample,
          customTicksExample,
          tickStyleExample,
          customLabelExample,
          noTicksExample
        }}
        markup={markup}
      />
    );
  }
}

export default TicksProps;
