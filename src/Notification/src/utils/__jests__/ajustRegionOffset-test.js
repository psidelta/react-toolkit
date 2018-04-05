/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Region from '@zippytech/region';

import adjustRegionOffset from '../adjustRegionOffset';

describe('adjustRegionOffset', () => {
  it('returns a new region with given offset', () => {
    const region = Region.from({
      top: 0,
      left: 0,
      bottom: 100,
      right: 100
    });

    const offset = 10;

    const expected = Region.from({
      left: 10,
      top: 10,
      bottom: 90,
      right: 90
    });

    const test = adjustRegionOffset({ region, offset });
    expect(expected.equals(test)).toBe(true);
  });
});
