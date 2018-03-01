'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getParentWithTranslate(node) {
  var parent = node && node.parentNode;
  var computedStyle = void 0;

  while (parent && parent !== global.document) {
    computedStyle = global.getComputedStyle(parent);
    if (computedStyle.transform !== 'none') {
      return parent;
    }
    parent = parent && parent.parentNode;
  }

  return false;
}

exports.default = getParentWithTranslate;