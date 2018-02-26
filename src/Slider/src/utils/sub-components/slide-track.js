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

import React from 'react';
import join from '../../../../common/join';

import { getPossitionOfValueBasedOnLimits } from '../value-utils';
import { convertProcentageRangeToPositionStyles } from '../styling-utils';

const getTrackFillPercentages = config => {
  const {
    currentValue,
    startValue,
    endValue,
    isReversed,
    trackFillPosition
  } = config;

  if (Array.isArray(currentValue)) {
    let [start, end] = [
      getPossitionOfValueBasedOnLimits(currentValue[0], {
        startValue,
        endValue
      }),
      getPossitionOfValueBasedOnLimits(currentValue[1], {
        startValue,
        endValue
      })
    ];
    return [Math.min(start, end), Math.max(start, end)];
  }
  if (trackFillPosition === 'start') {
    return [
      0,
      getPossitionOfValueBasedOnLimits(currentValue, { startValue, endValue })
    ];
  }
  return [
    getPossitionOfValueBasedOnLimits(currentValue, { startValue, endValue }),
    1
  ];
};

const getTrackFillPercentagesBasedOnRtl = config => {
  const {
    horizontal,
    trackFillPosition,
    rtl,
    currentValue,
    startValue,
    endValue,
    isReversed
  } = config;

  let computedTrackFillPosition = trackFillPosition;

  if (horizontal) {
    if (rtl) {
      if (trackFillPosition === 'end') {
        computedTrackFillPosition = 'start';
      } else {
        computedTrackFillPosition = 'end';
      }
    }
  }

  return getTrackFillPercentages({
    currentValue,
    startValue,
    endValue,
    isReversed,
    trackFillPosition: computedTrackFillPosition
  });
};

const renderTrack = (config, extraConfig, CLASS_NAME) => {
  const {
    noFill,
    trackStyle,
    horizontal,
    trackLineStyle,
    tickBarPosition,
    orientation
  } = config;

  const trackFillStyle = {
    ...config.trackFillStyle,
    ...convertProcentageRangeToPositionStyles(
      getTrackFillPercentagesBasedOnRtl(config),
      horizontal
    )
  };

  const {
    handlerComponents,
    handleTrackMouseDown,
    handleTrackClick,
    setTrackLineRef,
    setTrackFillRef,
    tabIndex,
    focused,
    endhandle,
    startHandle
  } = extraConfig;

  let trackClassName = `${CLASS_NAME}__track`;
  trackClassName = join(trackClassName, `${trackClassName}-${tickBarPosition}`);

  const classNames = join(
    trackClassName,
    focused && `${CLASS_NAME}__track--focused`
  );
  const tarckFillClassNames = join(
    `${CLASS_NAME}__track-fill`,
    focused && `${CLASS_NAME}__track-fill--focused`
  );

  return (
    <div
      key="track"
      className={classNames}
      style={trackStyle}
      onClick={handleTrackClick}
      onMouseDown={handleTrackMouseDown}
    >
      <div
        ref={setTrackLineRef}
        className={`${CLASS_NAME}__track-line`}
        style={trackLineStyle}
      >
        {!noFill && (
          <div
            ref={setTrackFillRef}
            className={tarckFillClassNames}
            tabIndex={tabIndex}
            style={trackFillStyle}
          />
        )}
        {handlerComponents}
      </div>
    </div>
  );
};

export { renderTrack, getTrackFillPercentages };
