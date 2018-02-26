
/**
 * Returns the top most modal
 * window id
 * @param {Array} list
 * @param {Object} instances
 * @return {Number} top most window id
 */
function getTopModalWindow(list, instances) {
  let topMostModalId = null
  for(let i = list.length - 1; i >= 0; i--) {
    if (instances[list[i]].props && instances[list[i]].props.modal) {
      topMostModalId = list[i]
      break
    }
  }

  return topMostModalId
}

export default getTopModalWindow
