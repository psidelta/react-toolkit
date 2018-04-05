/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bringToFront from '../bringToFront';

describe('bringToFront', () => {
  it('should return a new list with item in front (last)', () => {
    const list = [1, 2, 3];
    const expected = [1, 3, 2];

    expect(bringToFront(2, list)).toEqual(expected);
  });
});
