'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getDataProp = function getDataProp(propName) {
  if (propName == null) {
    return null;
  }

  return function (item) {
    if (!item) {
      return null;
    }
    return typeof propName === 'function' ? propName(item) : item[propName];
  };
};

exports.default = getDataProp;