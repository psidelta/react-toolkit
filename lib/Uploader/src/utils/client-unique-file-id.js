'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clientUniqueFileId;
// generates a unique client identifier for the given file object.
// used for determining duplicates and allowing removal and progress
// updating from the external component api.
function clientUniqueFileId(file) {
  var pathOrName = file.relativePath || file.webkitRelativePath || file.fileName || file.name || '';
  return file.size + '-' + pathOrName.replace(/[^0-9a-zA-Z_-]/img, '');
}