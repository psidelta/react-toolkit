/**
 * Return a list of id that have changed place in the list
 * compares first list one by one with the other list
 * and what is not in the second has changed.
 * @param {Array} list
 * @param {Array} previousList
 * @return {Array} changedList
 */
function getListDiff(next, previous) {
  return next.reduce((acc, item, index) => {
    if (item !== previous[index]) {
      acc.push(item);
    }

    return acc;
  }, []);
}

export default getListDiff;
