"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function constrainValueToStep(value, formatedStep, direction) {
  // interested only to `to`
  // value is floored to closest step
  var limits = void 0;

  if (direction === 1) {
    limits = formatedStep.map(function (step) {
      return step.from;
    });
  } else {
    limits = formatedStep.map(function (step) {
      return step.to;
    });
  }

  var constrainedValue = 0;

  // iterate over each to
  // and see which one is biggest less than value
  for (var i = formatedStep.length - 1; i >= 0; i--) {
    if (value >= limits[i]) {
      constrainedValue = limits[i];

      break;
    }
  }

  // if last limit is smaller or equal than value, than limit is the last one
  if (100 <= value) {
    return 100;
  }

  return constrainedValue;
}

exports.default = constrainValueToStep;