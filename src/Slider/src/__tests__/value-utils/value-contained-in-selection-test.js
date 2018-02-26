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

import { isValueContainedBySelection } from '../../utils/value-utils';

describe('isValueContainedBySelection logic', () => {
  let isContained;

  describe('normal range', () => {
    const baseConfig = {
      startValue: 0,
      endValue: 100
    };

    it('shuold support value in between currentValue and limit', () => {
      isContained = isValueContainedBySelection(15, {
        currentValue: 10,
        trackFillPosition: 'end',
        ...baseConfig
      });
      expect(isContained).to.be.true;

      isContained = isValueContainedBySelection(15, {
        currentValue: 10,
        trackFillPosition: 'start',
        ...baseConfig
      });

      expect(isContained).to.be.false;

      isContained = isValueContainedBySelection(5, {
        currentValue: 10,
        trackFillPosition: 'start',
        ...baseConfig
      });
      expect(isContained).to.be.true;
    });

    it('shuold return true for value on edges', () => {
      isContained = isValueContainedBySelection(10, {
        currentValue: 10,
        ...baseConfig,
        trackFillPosition: 'end'
      });
      expect(isContained).to.be.true;

      isContained = isValueContainedBySelection(100, {
        currentValue: 10,
        ...baseConfig,
        trackFillPosition: 'end'
      });

      expect(isContained).to.be.true;
    });
  });

  describe('reversed range', () => {
    const baseConfig = {
      startValue: 100,
      endValue: 0
    };

    it('shuold return true for value in between reversed range', () => {
      isContained = isValueContainedBySelection(5, {
        currentValue: 10,
        ...baseConfig,
        trackFillPosition: 'end'
      });
      expect(isContained).to.be.true;

      isContained = isValueContainedBySelection(5, {
        currentValue: 10,
        ...baseConfig,
        trackFillPosition: 'start'
      });
      expect(isContained).to.be.false;
    });

    it('shuold return true for value on reversed range edges', () => {
      isContained = isValueContainedBySelection(0, {
        currentValue: 10,
        ...baseConfig,
        trackFillPosition: 'end'
      });
      expect(isContained).to.be.true;

      isContained = isValueContainedBySelection(10, {
        currentValue: 10,
        ...baseConfig,
        trackFillPosition: 'end'
      });
      expect(isContained).to.be.true;
    });
  });
});
