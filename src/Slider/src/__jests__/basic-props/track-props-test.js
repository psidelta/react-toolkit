/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import Slider from '../../Slider';

describe('trackFillPosition prop (Slider only)', () => {
  it('should propagate trackFillPosition to renderTrack function', () => {
    const renderTrackSpy = jest.fn(() => <div key="spy" />);
    const sliderComponent = shallow(
      <Slider renderTrack={renderTrackSpy} trackFillPosition="start" />
    );

    expect(renderTrackSpy.mock.calls[0][0]).toHaveProperty(
      'trackFillPosition',
      'start'
    );

    sliderComponent.setProps({
      trackFillPosition: 'end'
    });

    expect(renderTrackSpy.mock.calls[1][0]).toHaveProperty(
      'trackFillPosition',
      'end'
    );
  });
});
