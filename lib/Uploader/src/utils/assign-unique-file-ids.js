'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assignFileUniqueIds;
// given an array of files, assigns id to all of them based on
// uuid function provided
function assignFileUniqueIds(files, uuidFunction) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var key = config.key || 'id';

  files.forEach(function (file, index) {
    file[key] = uuidFunction(file, index, files, config);
  });

  return files;
}