"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Remove props that are present in proptypes
 * @param Object props
 * @param Object defaultProps
 */
function cleanProps(props, propTypes) {
  if (!props) {
    return props;
  }
  var newProps = Object.keys(props).reduce(function (acc, propName) {
    if (!propTypes[propName]) {
      acc[propName] = props[propName];
    }
    return acc;
  }, {});

  return newProps;
}

exports.default = cleanProps;