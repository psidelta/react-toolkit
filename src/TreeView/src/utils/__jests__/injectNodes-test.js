/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import injectNodes from '../injectNodes';

describe('injectNodes', () => {
  it('should inject nodes at the correct place', () => {
    const nodesToInject = [{ label: 'injectedNode' }];
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
        nodes: [
          {
            label: 'test 1',
            nodes: nodesToInject
          }
        ]
      }
    ];

    const test = injectNodes(nodesToInject, [0, 0], data);

    expect(test).toEqual(expected);
  });
});
