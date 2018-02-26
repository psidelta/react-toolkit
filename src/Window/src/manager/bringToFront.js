/**
 * Cretes a new list where id will be send to the back
 * @param  {String|Int} id
 * @param  {Array} list
 * @return {Array}
 */
function bringToFront(id, list) {
  if (list.length === 1) {
    return list
  }
  let newList = list.filter(item => item !== id)
  newList = [...newList, id]

  return newList
}

export default bringToFront
