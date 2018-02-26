/**
 * Returns the name that multiple items share.
 * @param  {Object[]} items
 * @param  {String} nameProperty
 * @return {String|Null}
 */
function getSingleSelectNames({ items, nameProperty }) {
  if (!items || items.length <= 1) {
    return null;
  }

  let names = items.reduce((acc, item) => {
    const name = item[nameProperty];
    if (acc[name] !== undefined) {
      acc[name] = true;
    } else {
      acc[name] = false;
    }

    return acc;
  }, {});

  return names;
}

export default getSingleSelectNames;
