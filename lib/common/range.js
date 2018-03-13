"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Creates a range from start to end (not including end) using step as increment.
 * @param  {Number} start    Start Value
 * @param  {Number} end      End Value, it is noninclusive
 * @param  {Number} [step=1] Increment Value
 * @return {Array}          Range from start to end
 */
function range() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments[1];
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var collection = [];
  for (var i = start; i < end; i += step) {
    collection.push(i);
  }

  return collection;
}

exports.default = range;