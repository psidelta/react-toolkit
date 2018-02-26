'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = acceptsFile;
// accepts a file based on given acceptedFiles param (which is the html 5 accept prop)
function acceptsFile(file, acceptedFiles, index, filesArray, props) {
  if (typeof acceptedFiles === 'function') {
    return acceptedFiles(file, index, filesArray, props);
  }

  if (Array.isArray(acceptedFiles)) {
    return acceptedFiles.some(function (acceptFile) {
      return acceptsFile(file, acceptFile);
    });
  }

  if (file && acceptedFiles) {
    var acceptedFilesArray = acceptedFiles.split(',');
    var fileName = file.name || '';
    var mimeType = file.type || '';
    var baseMimeType = mimeType.replace(/\/.*$/, '');

    return acceptedFilesArray.some(function (type) {
      var currentType = type.trim();
      if (currentType.charAt(0) === '.') {
        return fileName.toLowerCase().endsWith(currentType.toLowerCase());
      } else if (/\/\*$/.test(currentType)) {
        return baseMimeType === currentType.replace(/\/.*$/, '');
      }
      return mimeType === currentType;
    });
  }
  return true;
}