'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Handles click on document, it checks if the click
 * comes from outside the target.
 *
 * Checks if the event.target is not a child and is not the
 * active target
 *@param {function} getRootNode => DOMNode
 * @param  {function} onHide
 * @return {function} unregister
 */
function registerHideOnClickOutsideEventListener(_ref) {
  var getRootNode = _ref.getRootNode,
      onHide = _ref.onHide;

  var eventHandler = function eventHandler(event) {
    var node = event.target;
    var rootNode = getRootNode();
    if (!rootNode) {
      return;
    }

    // target node should still be in the tree
    if (!global.document.body.contains(node)) {
      return;
    }

    if (rootNode !== node && !rootNode.contains(node)) {
      onHide(event, { target: null });
    }
  };

  // register
  global.document.addEventListener('click', eventHandler);

  var unregister = function unregister() {
    global.document.addEventListener('click', eventHandler);
  };

  return unregister;
}

exports.default = registerHideOnClickOutsideEventListener;