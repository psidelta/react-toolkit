'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var selector = 'input, select, textarea, button, object, a[href], [tabindex]';

function getFocusableElements(node) {
  if (!node) {
    return null;
  }
  // filter out nonvisible items
  var nodes = [].concat(_toConsumableArray(node.querySelectorAll(selector)));
  // http://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
  nodes = nodes.filter(function (el) {
    return el.offsetParent;
  });
  return nodes;
}

exports.default = getFocusableElements;