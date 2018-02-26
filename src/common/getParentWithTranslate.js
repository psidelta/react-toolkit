function getParentWithTranslate(node) {
  let parent = node && node.parentNode;
  let computedStyle;

  while (parent && parent !== global.document) {
    computedStyle = global.getComputedStyle(parent);
    if (computedStyle.transform !== 'none') {
      return parent;
    }
    parent = parent && parent.parentNode;
  }

  return false;
}

export default getParentWithTranslate;
