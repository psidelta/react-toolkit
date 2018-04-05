/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import normalizeOffset from '../normalizeOffset';

describe('normalizeOffset', () => {
  it('if a number applies the offset to all sides', () => {
    const expected = {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20
    };

    expect(normalizeOffset(20)).toEqual(expected);
  });
});
