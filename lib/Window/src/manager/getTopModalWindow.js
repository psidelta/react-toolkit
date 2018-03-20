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
  var instance = void 0;
  for (var i = list.length - 1; i >= 0; i--) {
    instance = instances[list[i]];
    if (instance.props && instance.props.modal && instance.getVisible()) {
      topMostModalId = list[i];
      break;
    }
  }

  return topMostModalId;
}

exports.default = getTopModalWindow;