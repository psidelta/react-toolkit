import React from 'react';
import { mount, shallow } from 'enzyme';
import Slider from '../../Slider';

describe('trackFillPosition prop (Slider only)', () => {
  it('should propagate trackFillPosition to renderTrack function', () => {
    const renderTrackSpy = sinon.spy(() => <div key="spy" />);
    const sliderComponent = shallow(
      <Slider renderTrack={renderTrackSpy} trackFillPosition="start" />
    );

    expect(renderTrackSpy.getCall(0).args[0]).to.have.property(
      'trackFillPosition',
      'start'
    );

    sliderComponent.setProps({
      trackFillPosition: 'end'
    });

    expect(renderTrackSpy.getCall(1).args[0]).to.have.property(
      'trackFillPosition',
      'end'
    );
  });
});
