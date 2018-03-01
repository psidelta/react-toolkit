"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Determines if the item is selected
 * @param  {Number|String}  id
 * @param  {Number|String}  value
 * @return {Boolean}
 */
function isSelected(_ref) {
  var id = _ref.id,
      value = _ref.value;

  if (Array.isArray(value)) {
    return value.indexOf(id) !== -1;
  }

  return id === value;
}

exports.default = isSelected;