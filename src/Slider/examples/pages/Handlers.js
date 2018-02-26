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
import markup from '../../docs/handlers.md';
import MarkdownPage from './MarkdownPage';

const handleSize1 = (
  <RangeSlider handleSize={{ width: 20, height: 20 }} startValue={-100} endValue={100} />
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
