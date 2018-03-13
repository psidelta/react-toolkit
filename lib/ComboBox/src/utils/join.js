'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return [].slice.call(arguments).filter(notEmpty).join(' ');
};

var notEmpty = function notEmpty(x) {
  return !!x;
};