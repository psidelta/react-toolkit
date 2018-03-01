'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function assign(target) {
  if (target === null || target === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  for (var _len = arguments.length, to = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    to[_key - 1] = arguments[_key];
  }

  to.forEach(function (toItem) {
    toItem = Object(toItem);
    Object.keys(toItem).forEach(function (key) {
      target[key] = toItem[key];
    });
  });

  return target;
}

exports.default = typeof Object.assign === 'function' ? Object.assign : assign;