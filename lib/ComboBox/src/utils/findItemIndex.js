"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns the index of the given item id
 * @param  {Number|String} id
 * @param  {Array} data
 * @param  {Function} getIdProperty
 * @return {Int}
 */
function findItemIndex(_ref) {
  var id = _ref.id,
      data = _ref.data,
      getIdProperty = _ref.getIdProperty;

  if (!Array.isArray(data) || !getIdProperty || id == null) {
    return null;
  }
  var filteredList = data.reduce(function (acc, item, index) {
    if (getIdProperty(item) === id) {
      acc = index;
    }

    return acc;
  }, null);

  return filteredList !== null ? filteredList : null;
}

exports.default = findItemIndex;