"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function safeParseInt(str) {
  return parseInt(str, 10);
}

exports.default = safeParseInt;