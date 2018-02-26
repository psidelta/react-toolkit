/**
 * Returns the index of the given item id
 * @param  {Number|String} id
 * @param  {Array} data
 * @param  {Function} getIdProperty
 * @return {Int}
 */
function findItemIndex({ id, data, getIdProperty }) {
  if (!Array.isArray(data) || !getIdProperty || id == null) {
    return null;
  }
  const filteredList = data.reduce((acc, item, index) => {
    if (getIdProperty(item) === id) {
      acc = index;
    }

    return acc;
  }, null);

  return filteredList !== null ? filteredList : null;
}

export default findItemIndex;
