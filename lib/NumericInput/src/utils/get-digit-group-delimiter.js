'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDigitGroupDelimiter;
function getDigitGroupDelimiter(locale) {
  var number = 1000;
  return number.toLocaleString(locale).replace(/[01]/g, '') || ','; // we need || "," since SAFARI does not work correctly
}