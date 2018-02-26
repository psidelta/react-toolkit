import matchesSelector from './matchesSelector';

function selectParent(selector, node) {
  node = node.parentElement;
  while (node) {
    if (matchesSelector(node, selector)) {
      return node;
    }
    node = node.parentElement;
  }

  return false;
}

export default selectParent;
