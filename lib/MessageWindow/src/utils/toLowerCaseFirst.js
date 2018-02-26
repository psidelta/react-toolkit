'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function toLowerCaseFirst(s) {
  return s ? s.charAt(0).toLowerCase() + s.substring(1) : '';
}

exports.default = toLowerCaseFirst;