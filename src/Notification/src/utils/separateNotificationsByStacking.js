/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Separates a list o notifications into two lists.
 * One that matches a stacking and the other list
 * the rest of the notificationt
 * @param  {[type]} notifications [description]
 * @param  {[type]} stack         [description]
 * @return {[type]}               [description]
 */
const separateNotificationsByStacking = ({ notifications, stacking }) => {
  const formatedStacking = stacking.join('-');

  return notifications.reduce(
    (acc, notification) => {
      // if is closed it must be excluded for filtered stack
      if (
        notification.stacking.join('-') === formatedStacking &&
        !notification.closed
      ) {
        acc.filteredNotifications.push(notification);
      } else {
        acc.otherNotifications.push(notification);
      }
      return acc;
    },
    { filteredNotifications: [], otherNotifications: [] }
  );
};

export default separateNotificationsByStacking;
