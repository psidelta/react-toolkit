"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function containsNode(parent, child) {
  if (!parent || !child || !(parent instanceof Element) || !(child instanceof Element)) {
    return false;
  }

  // target node should still be in the tree
  if (!global.document.body.contains(child)) {
    return false;
  }

  var result = true;
  if (parent !== child && !parent.contains(child)) {
    result = false;
  }

  return result;
}

exports.default = containsNode;