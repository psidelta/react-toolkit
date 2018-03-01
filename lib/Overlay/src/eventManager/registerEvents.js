'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Registers events listeners on document
 * @param  {String[]} events Dom event names
 * @param  {function} action event handler
 * @return {Void}
 */
function registerListeners(_ref) {
  var events = _ref.events,
      action = _ref.action;

  events.forEach(function (eventName) {
    // as it doesn't bubble we have to catch in capture
    if (eventName === 'mouseenter' || eventName === 'mouseleave' || eventName === 'scroll') {
      document.addEventListener(eventName, action, { capture: true });
    } else {
      document.addEventListener(eventName, action);
    }
  });
}

/**
 * Removes event listeners on document
 * @param  {String[]} events Dom event names
 * @param  {function} action event handler
 * @return {Void}
 */
function unregisterListeners(_ref2) {
  var events = _ref2.events,
      action = _ref2.action;

  events.forEach(function (eventName) {
    if (eventName === 'mouseenter' || eventName === 'mouseleave' || eventName === 'scroll') {
      document.removeEventListener(eventName, action, { capture: true });
    } else {
      document.removeEventListener(eventName, action);
    }
  });
}

exports.registerListeners = registerListeners;
exports.unregisterListeners = unregisterListeners;