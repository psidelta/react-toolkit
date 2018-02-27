/**
 * Returns the first from collection that matches the
 * test
 * @param  {Array} collection [description]
 * @param  {Function} test       [description]
 * @return {[type]}            [description]
 */
function find(collection, test) {
  if (!Array.isArray(collection)) {
    return null;
  }

  if (collection.length === 0) {
    return null;
  }

  if (Array.prototype.find) {
    return collection.find(test);
  }

  // this like of code must be after array and function check
  if (typeof test !== 'function') {
    return null;
  }

  let needle;
  for (let i = 0, len = collection.length; i < len; i++) {
    const item = collection[i];
    if (test(item)) {
      needle = item;
      break;
    }
  }

  return needle;
}

export default find;
