/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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

      expect(isContained).toBe(true);

      isContained = isValueContainedBySelection(15, {
        currentValue: 10,
        trackFillPosition: 'start',
        ...baseConfig
      });

      expect(isContained).toBe(false);

      isContained = isValueContainedBySelection(5, {
        currentValue: 10,
        trackFillPosition: 'start',
        ...baseConfig
      });
      expect(isContained).toBe(true);
    });

    it('shuold return true for value on edges', () => {
      isContained = isValueContainedBySelection(10, {
        currentValue: 10,
        ...baseConfig,
        trackFillPosition: 'end'
      });
      expect(isContained).toBe(true);

      isContained = isValueContainedBySelection(100, {
        currentValue: 10,
        ...baseConfig,
        trackFillPosition: 'end'
      });

      expect(isContained).toBe(true);
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
      expect(isContained).toBe(true);

      isContained = isValueContainedBySelection(5, {
        currentValue: 10,
        ...baseConfig,
        trackFillPosition: 'start'
      });
      expect(isContained).toBe(false);
    });

    it('shuold return true for value on reversed range edges', () => {
      isContained = isValueContainedBySelection(0, {
        currentValue: 10,
        ...baseConfig,
        trackFillPosition: 'end'
      });
      expect(isContained).toBe(true);

      isContained = isValueContainedBySelection(10, {
        currentValue: 10,
        ...baseConfig,
        trackFillPosition: 'end'
      });
      expect(isContained).toBe(true);
    });
  });
});
