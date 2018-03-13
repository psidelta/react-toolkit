"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Handles click on document, it checks if the click
 * comes from outside the target.
 *
 * Checks if the event.target is not a child and is not the
 * active target or the overlay
 *
 * @param  {String} target
 * @param  {function} onHide
 * @return {Void}
 */
function createHideOnClickOutsideAction(_ref) {
  var getOverlayNode = _ref.getOverlayNode,
      getActiveTargetNode = _ref.getActiveTargetNode,
      onHide = _ref.onHide;

  return function (event) {
    var node = event.target;
    var activeTargetNode = getActiveTargetNode();
    var overlayNode = getOverlayNode();

    if (!activeTargetNode || !overlayNode) {
      return null;
    }

    if (
    // overlay
    overlayNode !== node && !overlayNode.contains(node) &&
    // active target
    activeTargetNode !== node && !activeTargetNode.contains(node)) {
      onHide(event, { target: null });
    }
  };
}

exports.default = createHideOnClickOutsideAction;