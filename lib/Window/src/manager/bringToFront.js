"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Cretes a new list where id will be send to the back
 * @param  {String|Int} id
 * @param  {Array} list
 * @return {Array}
 */
function bringToFront(id, list) {
  if (list.length === 1) {
    return list;
  }
  var newList = list.filter(function (item) {
    return item !== id;
  });
  newList = [].concat(_toConsumableArray(newList), [id]);

  return newList;
}

exports.default = bringToFront;