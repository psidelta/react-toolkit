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
