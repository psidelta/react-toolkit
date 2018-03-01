"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Remove false keys from an object.
 * It mutates the object!.
 * @param  {Object} props
 * @return {Void}
 */
function cleanUpFalseProps(props) {
  Object.keys(props).forEach(function (path) {
    if (props[path] === false) {
      delete props[path];
    }
  });
}

exports.default = cleanUpFalseProps;