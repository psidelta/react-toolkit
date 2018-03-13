'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getSeparatorIndexes(children) {
  return children.reduce(function (acc, child, index) {
    if (child === '-' || child.props && child.props.isSeparator) {
      acc.push(index);
    }
    return acc;
  }, []);
}

exports.default = getSeparatorIndexes;