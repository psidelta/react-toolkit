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

import { getTrackFillPercentages } from '../../utils/sub-components/slide-track';

describe('getTrackFillPercentages logic', () => {
  let trackFillPercentages;

  it('should return percentages of range', () => {
    // 0...10..20....50...........100
    // ^---|    |--------------------
    trackFillPercentages = getTrackFillPercentages({
      currentValue: [10, 20],
      startValue: 0,
      endValue: 100
    });

    expect(trackFillPercentages).to.deep.equal([0.1, 0.2]);
  });

  it('should return percentages of reversed range', () => {
    // 100.........50....30...20....0
    // ^----from left----|    |------
    trackFillPercentages = getTrackFillPercentages({
      currentValue: [30, 20],
      startValue: 100,
      endValue: 0
    });

    expect(trackFillPercentages).to.deep.equal([0.7, 0.8]);
  });

  it('should return percentages of slide from start', () => {
    trackFillPercentages = getTrackFillPercentages({
      currentValue: 20,
      startValue: -100,
      endValue: 100,
      trackFillPosition: 'start'
    });

    expect(trackFillPercentages).to.deep.equal([0, 0.6]);
  });

  it('should return percentages of slide from end', () => {
    trackFillPercentages = getTrackFillPercentages({
      currentValue: 20,
      startValue: -100,
      endValue: 100,
      trackFillPosition: 'end'
    });

    expect(trackFillPercentages).to.deep.equal([0.6, 1]);
  });

  it('should return percentages of slide from start reversed', () => {
    trackFillPercentages = getTrackFillPercentages({
      currentValue: 20,
      startValue: 100,
      endValue: -100,
      trackFillPosition: 'start'
    });

    expect(trackFillPercentages).to.deep.equal([0, 0.4]);
  });

  it('should return percentages of slide from end reversed', () => {
    trackFillPercentages = getTrackFillPercentages({
      currentValue: 20,
      startValue: 100,
      endValue: -100,
      trackFillPosition: 'end'
    });

    expect(trackFillPercentages).to.deep.equal([0.4, 1]);
  });

  it('should return percentages assuring lower value first', () => {
    trackFillPercentages = getTrackFillPercentages({
      currentValue: [-1.5, 2],
      startValue: 36,
      endValue: -12,
      trackFillPosition: 'end'
    });

    expect(trackFillPercentages).to.deep.equal([0.708, 0.781]);
  });
});
