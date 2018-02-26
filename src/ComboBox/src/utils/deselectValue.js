/**
 * Removes value from multiple or single value
 * @return {Array|String|Number|Null} new value
 */
function deselectValue({ id, value, getIdProperty = item => item && item.id }) {
  let newValue;
  const singleValueId =
    typeof value === 'object' ? getIdProperty(value) : value;
  if (id === singleValueId || singleValueId === null) {
    newValue = null;
  }
  if (Array.isArray(value)) {
    newValue = value.filter(value => {
      const valueId = typeof value === 'object' ? getIdProperty(value) : value;
      return valueId !== id;
    });
    if (!newValue.length) {
      newValue = null;
    }
  }

  return newValue;
}

export default deselectValue;
