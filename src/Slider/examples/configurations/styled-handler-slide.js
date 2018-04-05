/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Slider from '../../src/Slider';

const leftArrow = (
  <svg width="18" height="18" fill="#000000" viewBox="0 0 24 24">
    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
    <path d="M0-.5h24v24H0z" fill="none" />
  </svg>
);

const rightArrow = (
  <svg width="18" height="18" fill="#000000" viewBox="0 0 24 24">
    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
    <path d="M0-.25h24v24H0z" fill="none" />
  </svg>
);

const renderHandleContent = domProps => {
  return (
    <div {...domProps}>
      <div style={{ display: 'inline-flex' }}>
        {leftArrow}
        {rightArrow}
      </div>
    </div>
  );
};

const cssStyle = (
  <style>
    {`
  .custom-handler-1 {
    height: 40px;
  }

  .custom-handler-1:focus {
    border: 1px solid transparent;
  }

  .custom-handler-1 .react-slide__track {
    height: 22px;
    border-radius: 4px;
    background-color: #f3f3f3;
    box-shadow: 0 0 2px 0px #111, 0 0 2px 0px #fff inset;
  }

  .custom-handler-1 .react-slide__track-fill {
    background: linear-gradient(to bottom, #99ea27 0%,#67c425 100%);
    box-shadow: 0 0 2px 0px #FFFEEF inset;
    border-radius: 4px;
  }

  .custom-handler-1 .react-slide__handle svg {
    margin-top: 1px;
    width: 14px;
    height: 14px;
    fill: #666;
  }

  .custom-handler-1 .react-slide__handle {
    display: flex;
    border-radius:4px;
    background-color: #f4f4f4;
    box-shadow: 0 0 2px 0px #111;
    border: 1px solid #fff;
    transition: scale .2s ease-in, background-color .2s ease-in;
  }

  .custom-handler-1 .react-slide__handle--active {
    background-color: #fff;
    transform: scale(1.1,1.1) translatey(-7px);
  }

`}
  </style>
);

const customHandleSlider1 = (
  <Slider
    className="custom-handler-1"
    tickBarPosition="none"
    renderHandleContent={renderHandleContent}
    handleSize={{ width: 36, height: 18 }}
    defaultValue={50}
  />
);

export default (
  <div>
    {cssStyle}
    {customHandleSlider1}
  </div>
);
