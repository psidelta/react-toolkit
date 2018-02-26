/**
 * Separates items into two groups.
 * Tags that can be rendered in a normal way.
 * And items that don't fit and must be rendered into one.
 * @param  {Object[]} items
 * @param  {Number} maxTagsLength
 * @return {{ remainingItems: Object[], visibleItems: Object[] }}
 */
function groupItems({ items, maxTagsLength }) {
  let visibleItems = items;
  let remainingItems = null;

  if (items.length > maxTagsLength) {
    const cutFrom = maxTagsLength;
    remainingItems = items.slice(cutFrom);
    visibleItems = items.slice(0, cutFrom);
  }

  return {
    visibleItems,
    remainingItems
  };
}

export default groupItems;
