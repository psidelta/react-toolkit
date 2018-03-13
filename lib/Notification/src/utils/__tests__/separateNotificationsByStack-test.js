'use strict';

var _separateNotificationsByStacking = require('../separateNotificationsByStacking');

var _separateNotificationsByStacking2 = _interopRequireDefault(_separateNotificationsByStacking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('separateNotificationsByStacking', function () {
  it('filters out in to lists matched and unmatched notifications', function () {
    var input = [{ id: 1, stacking: ['left', 'right'] }, { id: 2, stacking: ['left', 'right'] }, { id: 3, stacking: ['top', 'right'] }, { id: 4, stacking: ['bottom', 'right'] }];
    var expected = {
      filteredNotifications: [{ id: 1, stacking: ['left', 'right'] }, { id: 2, stacking: ['left', 'right'] }],
      otherNotifications: [{ id: 3, stacking: ['top', 'right'] }, { id: 4, stacking: ['bottom', 'right'] }]
    };

    expect((0, _separateNotificationsByStacking2.default)({
      notifications: input,
      stacking: ['left', 'right']
    })).toEqual(expected);
  });

  it('must filter out closed notifications', function () {
    var input = [{ id: 1, stacking: ['left', 'right'] }, { id: 2, stacking: ['left', 'right'], closed: true }, { id: 3, stacking: ['top', 'right'] }, { id: 4, stacking: ['bottom', 'right'] }];
    var expected = {
      filteredNotifications: [{ id: 1, stacking: ['left', 'right'] }],
      otherNotifications: [{ id: 2, stacking: ['left', 'right'], closed: true }, { id: 3, stacking: ['top', 'right'] }, { id: 4, stacking: ['bottom', 'right'] }]
    };

    expect((0, _separateNotificationsByStacking2.default)({
      notifications: input,
      stacking: ['left', 'right']
    })).toEqual(expected);
  });
});