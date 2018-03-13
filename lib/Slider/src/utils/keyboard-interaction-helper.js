'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDeltaValueBasedOnKeyDownEvent;
function getDeltaValueBasedOnKeyDownEvent(event, config) {
  var diff = null;
  var key = event.key,
      shiftKey = event.shiftKey;
  var currentValue = config.currentValue,
      step = config.step,
      largeStep = config.largeStep,
      horizontal = config.horizontal,
      isRevered = config.isRevered,
      getValueModifier = config.getValueModifier,
      endValue = config.endValue,
      startValue = config.startValue;


  var computedStep = getValueModifier(event, config);

  switch (key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      diff = -computedStep;
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      diff = computedStep;
      break;
    case 'PageUp':
      diff = -largeStep;
      break;
    case 'PageDown':
      diff = largeStep;
      break;

    case 'End':
      diff = endValue;
      break;
    case 'Home':
      diff = -endValue;
      break;
  }

  if (diff !== null) {
    diff *= isRevered ? -1 : 1;
  }

  return diff;
}

var getValueModifier = function getValueModifier(event, config) {
  var shiftKey = event.shiftKey;
  var largeStep = config.largeStep,
      step = config.step;

  return shiftKey ? largeStep : step;
};

exports.getValueModifier = getValueModifier;