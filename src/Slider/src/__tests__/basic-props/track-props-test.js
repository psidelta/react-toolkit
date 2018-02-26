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
import { mount, shallow } from 'enzyme';
import Slider from '../../Slider';

describe('trackFillPosition prop (Slider only)', () => {
  it('should propagate trackFillPosition to renderTrack function', () => {
    const renderTrackSpy = sinon.spy(() => <div key="spy" />);
    const sliderComponent = shallow(
      <Slider renderTrack={renderTrackSpy} trackFillPosition="start" />
    );

    expect(renderTrackSpy.getCall(0).args[0]).to.have.property('trackFillPosition', 'start');

    sliderComponent.setProps({
      trackFillPosition: 'end'
    });

    expect(renderTrackSpy.getCall(1).args[0]).to.have.property('trackFillPosition', 'end');
  });
});
