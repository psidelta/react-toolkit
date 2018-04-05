/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import injectNode from '../injectNode';

describe('injectNode', () => {
  it('should inject node at the correct place', () => {
    const nodeToInject = { label: 'injectedNode' };
    const data = [
      {
        label: 'test',
        nodes: [
          {
            label: 'test 1'
          }
        ]
      }
    ];

    const expected = [
      {
        label: 'test',
        nodes: [nodeToInject]
      }
    ];

    const test = injectNode(nodeToInject, [0, 0], data);

    expect(test).toEqual(expected);
  });
});
