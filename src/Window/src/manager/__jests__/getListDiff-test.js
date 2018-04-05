/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getListDiff from '../getListDiff';

describe('getListDiff', () => {
  it('should return items that have changed place', () => {
    const list = [2, 1, 3, 5];
    const previous = [1, 2, 3, 4, 5];
    const expected = [2, 1, 5];

    expect(getListDiff(list, previous)).toEqual(expected);
  });
});
