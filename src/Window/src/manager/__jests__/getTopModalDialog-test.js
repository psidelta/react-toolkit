/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getTopModalWindow from '../getTopModalWindow';

describe('getTopModalWindow', () => {
  it('should return top most modal id', () => {
    const list = [1, 2, 3, 4, 5];
    const instances = {
      1: { props: {} },
      5: { props: {} },
      4: { props: { modal: true } },
      2: { props: { modal: true } },
      3: { props: {} }
    };
    const expected = 4;

    expect(getTopModalWindow(list, instances)).toEqual(expected);
  });
});
