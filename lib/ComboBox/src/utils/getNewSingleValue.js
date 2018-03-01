"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns the new value
 * @param  {String|number} id
 * @param  {String|number} value
 * @return {String|number}
 */
function getNewSingleValue(_ref) {
  var id = _ref.id,
      value = _ref.value,
      _ref$toggle = _ref.toggle,
      toggle = _ref$toggle === undefined ? true : _ref$toggle;

  if (value == null) {
    return id;
  }

  if (toggle) {
    return id === value ? null : id;
  }

  return id;
}

exports.default = getNewSingleValue;