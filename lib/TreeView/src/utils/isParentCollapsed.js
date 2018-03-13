"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Tests whether one if it's ancestor is collapsed
 * @param {Object} parent
 * @return {Booleon} collapsed
 */
function isParentCollapsed(parent) {
  if (!parent) {
    return false;
  }

  parent = parent;
  var collapsed = false;

  while (parent) {
    if (parent.collapsed) {
      collapsed = true;
      break;
    }
    parent = parent.parent;
  }

  return collapsed;
}

exports.default = isParentCollapsed;