/**
 * Returns the new value
 * @param  {String|number} id
 * @param  {String|number} value
 * @return {String|number}
 */
function getNewSingleValue({ id, value, toggle = true }) {
  if (value == null) {
    return id;
  }

  if (toggle) {
    return id === value ? null : id;
  }

  return id;
}

export default getNewSingleValue;
