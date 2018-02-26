/**
 * Brings id foward (swap with item at next index)
 * @param {Number} id
 * @param {Array} list
 * @return {Array} newList
 */
function bringForwards(id, list) {
  let newList = [...list]
  const indexOfId = newList.indexOf(id)
  if (indexOfId === newList.length - 1 || indexOfId === -1) {
    return list // nothing changed
  }

  const copy = list[indexOfId + 1]
  newList[indexOfId + 1] = id
  newList[indexOfId] = copy

  return newList
}

export default bringForwards
