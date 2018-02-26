'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fileReadAsDataURL;
function fileReadAsDataURL(file) {
  if (typeof FileReader !== 'undefined') {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        resolve(reader.result);
      });

      reader.readAsDataURL(file);
    });
  }

  return Promise.resolve();
}