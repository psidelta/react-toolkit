/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getLastRootNode from '../getLastRootNode';

describe('getLastRootNode', () => {
  it('should return the correct node', () => {
    const visibleNodes = [
      { id: 1, parent: null },
      { id: 2, parent: null },
      { id: 3, parent: {} },
      { id: 4, parent: null },
      { id: 5, parent: null }
    ];

    expect(getLastRootNode(1, visibleNodes).id).toEqual(5);
  });
});
