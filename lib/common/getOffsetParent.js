'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * If fixed the offset parent is null, so
 * must find first parent with position set.
 */
function getOffsetParent(node) {
  var parent = node && node.parentNode;

  // fist check if first parent has position,
  // if not get offsetparent
  var computedStyle = global.getComputedStyle(parent);
  if (computedStyle.position !== 'static') {
    return parent;
  }

  return parent && parent.offsetParent;
}

exports.default = getOffsetParent;