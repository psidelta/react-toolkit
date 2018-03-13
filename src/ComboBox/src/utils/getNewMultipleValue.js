/**
 * Gets new multiple value when an item
 * has been clicked.
 * @param  {String|number} id    Id of the item
 * @param  {Array|null} value previous value
 * @return {Array|null}       newValue
 */
function getNewMultipleValue({ id, value }) {
  let newValue;

  const isArray = Array.isArray(value);
  const hasValue = isArray && value.indexOf(id) !== -1;
  if (hasValue) {
    newValue = value.filter(itemId => itemId !== id);
    newValue = newValue.length ? newValue : null;
  } else {
    // can be null
    newValue = isArray ? [...value, id] : [id];
  }

  return newValue;
}

export default getNewMultipleValue;
