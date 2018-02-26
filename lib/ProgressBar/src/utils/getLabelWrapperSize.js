"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * depricated
 */
function getLabelWrapperSize(size) {
  // wrapper must be as big as the entire progressbar
  // so we have two color label depending on the progress
  // for 50, we must add 200
  // for 100 do nothing .. so it is inversely  proportional
  // for 0 is 100
  // size = k/n
  // k = constant of proportionality
  // 200 = k/50 => k = 10000
  return 10000 / size;
}

exports.default = getLabelWrapperSize;