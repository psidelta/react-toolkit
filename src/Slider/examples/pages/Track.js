/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import Slider from '../../src/Slider';
import RangeSlider from '../../src/RangeSlider';
import markup from '../../docs/track.md';
import MarkdownPage from './MarkdownPage';

const trackStyles = (
  <RangeSlider
    trackStyle={{
      borderRadius: 3,
      height: 8,
      backgroundColor: '#999'
    }}
    trackLineStyle={{
      borderRadius: 3,
      height: 4,
      marginTop: 2,
      backgroundColor: 'lightblue'
    }}
    trackFillStyle={{
      backgroundColor: 'lightgreen'
    }}
  />
);

const noTrackClick = <RangeSlider enableTrackClick={false} />;

class TrackProps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MarkdownPage
        examplesMap={{
          trackStyles,
          noTrackClick
        }}
        markup={markup}
      />
    );
  }
}

export default TrackProps;
