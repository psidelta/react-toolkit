"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns the reverse index. It is used when the list
 * is rendered in top position, first item should be at the bottom
 * at last item at the top, so index must be fliped.
 * For index 0, and length 20, oposite index should be 19
 * @param  {Number} index
 * @param  {Number} length
 * @return {Number} oposite index
 */
function getOpositeIndex(index, length) {
  return length - 1 - index;
}

exports.default = getOpositeIndex;