/**
 * Finds a previous sibling that is a root node (parent === null)
 * @param {Number} activeIndex
 * @param {Array} visibleNodes
 * @return {Object} previousRootNode
 */
function getPreviousRootNode(activeIndex, visibleNodes) {
  let result = null;
  let index = visibleNodes.length - 1;

  while (index > activeIndex) {
    if (visibleNodes[index].parent === null) {
      result = visibleNodes[index];
      break;
    }
    index -= 1;
  }

  return result;
}

export default getPreviousRootNode;
