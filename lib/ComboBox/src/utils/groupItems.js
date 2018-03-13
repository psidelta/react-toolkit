"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Separates items into two groups.
 * Tags that can be rendered in a normal way.
 * And items that don't fit and must be rendered into one.
 * @param  {Object[]} items
 * @param  {Number} maxTagsLength
 * @return {{ remainingItems: Object[], visibleItems: Object[] }}
 */
function groupItems(_ref) {
  var items = _ref.items,
      maxTagsLength = _ref.maxTagsLength;

  var visibleItems = items;
  var remainingItems = null;

  if (items.length > maxTagsLength) {
    var cutFrom = maxTagsLength;
    remainingItems = items.slice(cutFrom);
    visibleItems = items.slice(0, cutFrom);
  }

  return {
    visibleItems: visibleItems,
    remainingItems: remainingItems
  };
}

exports.default = groupItems;