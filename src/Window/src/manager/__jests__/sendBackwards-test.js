/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import sendBackwards from '../sendBackwards';

describe('sendBackwards', () => {
  it('should bring id one step forward (index--)', () => {
    const list = [1, 2, 3, 4, 5];
    const expected = [1, 2, 4, 3, 5];

    expect(sendBackwards(4, list)).toEqual(expected);
  });
});
