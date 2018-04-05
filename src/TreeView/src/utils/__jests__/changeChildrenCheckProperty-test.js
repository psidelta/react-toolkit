/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import changeChildrenCheckProperty from '../changeChildrenCheckProperty';

describe('changeChildrenCheckProperty', () => {
  it('changeChildrenCheckProperty should work', () => {
    const test = {
      path: '0',
      children: [
        {
          path: '0/0'
        },
        {
          path: '0/1',
          children: [{}, {}],
          disabled: true
        }
      ]
    };
    expect(changeChildrenCheckProperty(test, true)).toEqual({
      0: true
    });
  });
});
