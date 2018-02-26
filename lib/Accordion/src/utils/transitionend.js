'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whichTransitionEvent;
function whichTransitionEvent() {
  var el = document.createElement('fakeelement');
  var transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  var t = Object.keys(transitions).find(function (key) {
    return el.style[transitions[key]] !== undefined;
  });

  if (t) {
    return transitions[t];
  }

  return 'transitionend';
}