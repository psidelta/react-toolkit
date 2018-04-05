/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import Slider from '../../src/Slider';
import RangeSlider from '../../src/RangeSlider';
import markup from '../../docs/handlers.md';
import MarkdownPage from './MarkdownPage';

const handleSize1 = (
  <RangeSlider
    handleSize={{ width: 20, height: 20 }}
    startValue={-100}
    endValue={100}
  />
);
const handleSizeAndStyle = (
  <RangeSlider
    handleSize={{ width: 15, height: 15 }}
    handleStyle={{ borderRadius: '50%', backgroundColor: '#036' }}
  />
);
const cssClassesAndHandlers = (
  <RangeSlider
    className="my-react-slider"
    handleSize={{ width: 15, height: 15 }}
    handleStyle={{ borderRadius: '50%' }}
  />
);

const renderHandleContentWithValue = (domProps, customProps) => {
  const [selectionStart, selectionEnd] = customProps.value;
  let currentValue = selectionStart;
  if (domProps.key === 'endHandler') {
    currentValue = selectionEnd;
  }
  return <div {...domProps} children={currentValue} />;
};

const customHandler = (
  <RangeSlider
    renderHandleContent={renderHandleContentWithValue}
    handleSize={{ width: 30, height: 15 }}
    handleStyle={{
      fontSize: 8,
      lineHeight: '15px',
      textAlign: 'center',
      borderRadius: '7.5px',
      color: '#fff',
      userSelect: 'none'
    }}
    tickLabels={false}
  />
);

class HandlerProps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const style = { borderRadius: '50%', backgroundColor: '#036' };
    return (
      <div>
        <RangeSlider
          handleSize={{ width: 15, height: 15 }}
          handleSize={{ borderRadius: '50%', backgroundColor: '#036' }}
        />
        <Slider
          handleSize={{ width: 15, height: 15 }}
          handleSize={{ borderRadius: '50%', backgroundColor: '#036' }}
        />
        <RangeSlider
          handleSize={{ width: 15, height: 15 }}
          handleStyle={{ borderRadius: '50%', backgroundColor: '#036' }}
        />

        <style>
          {`
        .my-react-slider .react-slide__handle:focus {
          background-color: red;
        }
      `}
        </style>
        <MarkdownPage
          examplesMap={{
            handleSize1,
            handleSizeAndStyle,
            cssClassesAndHandlers,
            customHandler
          }}
          markup={markup}
        />
      </div>
    );
  }
}

export default HandlerProps;
