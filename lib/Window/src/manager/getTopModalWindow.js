"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Returns the top most modal
 * window id
 * @param {Array} list
 * @param {Object} instances
 * @return {Number} top most window id
 */
function getTopModalWindow(list, instances) {
  var topMostModalId = null;
  for (var i = list.length - 1; i >= 0; i--) {
    if (instances[list[i]].props && instances[list[i]].props.modal) {
      topMostModalId = list[i];
      break;
    }
  }

  return topMostModalId;
}

exports.default = getTopModalWindow;