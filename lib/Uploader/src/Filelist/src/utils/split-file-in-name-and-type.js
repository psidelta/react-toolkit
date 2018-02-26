'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitFileInNameAndType;
function splitFileInNameAndType(name) {
  name = name || '';
  var indexOfDot = name.lastIndexOf('.');
  var fileName = name.substring(0, indexOfDot);
  var fileExtention = name.substring(indexOfDot);
  return { fileName: fileName, fileExtention: fileExtention };
};