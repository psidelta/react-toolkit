/**
 * Normalizes event names to an array
 * @param  {String|String[]} event
 * @return {Array}
 */
function normalizeEvent(events) {
  return Array.isArray(events) ? events : [events];
}

export default normalizeEvent;
