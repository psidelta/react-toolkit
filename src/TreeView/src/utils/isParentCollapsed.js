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
  let collapsed = false;

  while (parent) {
    if (parent.collapsed) {
      collapsed = true;
      break;
    }
    parent = parent.parent;
  }

  return collapsed;
}

export default isParentCollapsed;
