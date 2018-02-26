/**
 * Determines if the item is selected
 * @param  {Number|String}  id
 * @param  {Number|String}  value
 * @return {Boolean}
 */
function isSelected({ id, value }) {
  if (Array.isArray(value)) {
    return value.indexOf(id) !== -1;
  }

  return id === value;
}

export default isSelected;
