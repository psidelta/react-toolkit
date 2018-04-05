/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import separateNotificationsByStacking from '../separateNotificationsByStacking';

describe('separateNotificationsByStacking', () => {
  it('filters out in to lists matched and unmatched notifications', () => {
    const input = [
      { id: 1, stacking: ['left', 'right'] },
      { id: 2, stacking: ['left', 'right'] },
      { id: 3, stacking: ['top', 'right'] },
      { id: 4, stacking: ['bottom', 'right'] }
    ];
    const expected = {
      filteredNotifications: [
        { id: 1, stacking: ['left', 'right'] },
        { id: 2, stacking: ['left', 'right'] }
      ],
      otherNotifications: [
        { id: 3, stacking: ['top', 'right'] },
        { id: 4, stacking: ['bottom', 'right'] }
      ]
    };

    expect(
      separateNotificationsByStacking({
        notifications: input,
        stacking: ['left', 'right']
      })
    ).toEqual(expected);
  });

  it('must filter out closed notifications', () => {
    const input = [
      { id: 1, stacking: ['left', 'right'] },
      { id: 2, stacking: ['left', 'right'], closed: true },
      { id: 3, stacking: ['top', 'right'] },
      { id: 4, stacking: ['bottom', 'right'] }
    ];
    const expected = {
      filteredNotifications: [{ id: 1, stacking: ['left', 'right'] }],
      otherNotifications: [
        { id: 2, stacking: ['left', 'right'], closed: true },
        { id: 3, stacking: ['top', 'right'] },
        { id: 4, stacking: ['bottom', 'right'] }
      ]
    };

    expect(
      separateNotificationsByStacking({
        notifications: input,
        stacking: ['left', 'right']
      })
    ).toEqual(expected);
  });
});
