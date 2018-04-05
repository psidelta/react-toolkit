/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import sendToBack from '../sendToBack';

describe('sendToBack', () => {
  it('should return a new list with item in front (last)', () => {
    const list = [1, 2, 3];
    const expected = [2, 1, 3];

    expect(sendToBack(2, list)).toEqual(expected);
  });
});
