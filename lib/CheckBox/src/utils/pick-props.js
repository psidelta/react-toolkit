"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pickProps;
function pickProps(props, targetProps) {
  var pickedProps = {};
  Object.keys(targetProps).forEach(function (key) {
    if (props[key] !== undefined) {
      pickedProps[key] = props[key];
    }
  });

  return pickedProps;
}