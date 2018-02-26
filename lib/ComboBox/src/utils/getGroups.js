'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
 * Takes a datasource and creates a data structure that describes the groups.
 * The structure looks like
 * @param Object[] data
 * @param String groupProperty
 * @return {
 *   [index where to render the groip]: {
 *     title: data[groupProperty]<String>,
 *     indexAjustment: <Number>
 *   },
 *   ..
 * }
*/
function getGroups(data) {
  var groupProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'group';

  var groupsConfig = data.reduce(function (acc, item, index) {
    var groupTitle = item[groupProperty];
    var currentGroup = acc.groups[acc.currentGroup];

    // there is a new group
    if (groupTitle && groupTitle !== (currentGroup && currentGroup.title)) {
      var newGroup = {
        title: groupTitle,
        indexAjustment: acc.indexAjustment + 1
      };
      var groupIndex = index + acc.indexAjustment;

      acc.groups[groupIndex] = newGroup;
      acc.currentGroup = groupIndex;
      acc.indexAjustment += 1;
    }

    return acc;
  }, {
    groups: {},
    currentGroup: 0,
    indexAjustment: 0
  });

  return groupsConfig.groups;
}

exports.default = getGroups;