"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns the name that multiple items share.
 * @param  {Object[]} items
 * @param  {String} nameProperty
 * @return {String|Null}
 */
function getSingleSelectNames(_ref) {
  var items = _ref.items,
      nameProperty = _ref.nameProperty;

  if (!items || items.length <= 1) {
    return null;
  }

  var names = items.reduce(function (acc, item) {
    var name = item[nameProperty];
    if (acc[name] !== undefined) {
      acc[name] = true;
    } else {
      acc[name] = false;
    }

    return acc;
  }, {});

  return names;
}

exports.default = getSingleSelectNames;