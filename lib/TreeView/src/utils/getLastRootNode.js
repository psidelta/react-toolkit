"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Finds a previous sibling that is a root node (parent === null)
 * @param {Number} activeIndex
 * @param {Array} visibleNodes
 * @return {Object} previousRootNode
 */
function getPreviousRootNode(activeIndex, visibleNodes) {
  var result = null;
  var index = visibleNodes.length - 1;

  while (index > activeIndex) {
    if (visibleNodes[index].parent === null) {
      result = visibleNodes[index];
      break;
    }
    index -= 1;
  }

  return result;
}

exports.default = getPreviousRootNode;