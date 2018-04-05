/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bringForwards from '../bringForwards';

describe('bringForwards', () => {
  it('should bring id one step forward (index++)', () => {
    const list = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3, 5, 4];

    expect(bringForwards(4, list)).toEqual(expected);
  });
});
