'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Separates a list o notifications into two lists.
 * One that matches a stacking and the other list
 * the rest of the notificationt
 * @param  {[type]} notifications [description]
 * @param  {[type]} stack         [description]
 * @return {[type]}               [description]
 */
var separateNotificationsByStacking = function separateNotificationsByStacking(_ref) {
  var notifications = _ref.notifications,
      stacking = _ref.stacking;

  var formatedStacking = stacking.join('-');

  return notifications.reduce(function (acc, notification) {
    // if is closed it must be excluded for filtered stack
    if (notification.stacking.join('-') === formatedStacking && !notification.closed) {
      acc.filteredNotifications.push(notification);
    } else {
      acc.otherNotifications.push(notification);
    }
    return acc;
  }, { filteredNotifications: [], otherNotifications: [] });
};

exports.default = separateNotificationsByStacking;