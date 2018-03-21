/**
 * Returns the top most modal
 * window id
 * @param {Array} list
 * @param {Object} instances
 * @return {Number} top most window id
 */
function getTopModalWindow(list, instances) {
  let topMostModalId = null;
  let instance;
  for (let i = list.length - 1; i >= 0; i--) {
    instance = instances[list[i]];
    if (instance.props && instance.props.modal && instance.getVisible()) {
      topMostModalId = list[i];
      break;
    }
  }

  return topMostModalId;
}

export default getTopModalWindow;
