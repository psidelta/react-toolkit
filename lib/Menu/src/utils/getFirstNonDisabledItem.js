"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns the first index that is non disabled
 * if all items are disabled then null is returned
 * @param  {Object[]} items
 * @return {Number} index
 */
function getFirstNonDisabledItem(items) {
  var fistNonDisabledItemIndex = null;
  if (!items || items && !items.length) {
    return null;
  }
  for (var i = 0, len = items.length; i < len; i++) {
    var item = items[i];
    if (item && !item.disabled && !item.isTitle) {
      fistNonDisabledItemIndex = i;
      break;
    }
  }

  return fistNonDisabledItemIndex;
}

exports.default = getFirstNonDisabledItem;