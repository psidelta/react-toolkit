import assign from '../../../common/assign';

/**
 * Returns a map with all it children
 * checked or uncheded, depending on
 * check value
 * @param {Object} nodeProps - nodeProps
 * @param {Bool} checked
 * @return {Object} checkMap
 */
function changeChildrenProperty(nodeProps, newState) {
  let propertyMap = { [nodeProps.path]: newState };
  if (nodeProps.children) {
    const children = nodeProps.children.map(child =>
      changeChildrenProperty(child.props, newState)
    );

    children.forEach(child => {
      assign(propertyMap, child);
    });
  }

  return propertyMap;
}

export default changeChildrenProperty;
