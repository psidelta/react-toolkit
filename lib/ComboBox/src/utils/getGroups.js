'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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