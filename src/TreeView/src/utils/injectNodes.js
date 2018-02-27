import assign from 'object-assign';

/**
 * Creates a new array with nodes injected
 * at the specified indexPath
 * @param {Array} nodes
 * @param {Array} indexPath
 * @param {Array} data
 * @return {Array} newData
 */
function injectNodes(nodes, indexPath, data) {
  let newData;
  let currentIndex = indexPath[0];

  // last item
  if (indexPath.length === 1) {
    return data.map((node, index) => {
      if (index === currentIndex) {
        return assign({}, node, { nodes });
      }

      return node;
    });
  }

  newData = data.map((node, index) => {
    if (index === currentIndex) {
      return assign({}, node, {
        nodes: injectNodes(nodes, indexPath.slice(1), node.nodes)
      });
    }

    return node;
  });

  return newData;
}

export default injectNodes;
