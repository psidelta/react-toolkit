'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matchesSelector = require('./matchesSelector');

var _matchesSelector2 = _interopRequireDefault(_matchesSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function selectParent(selector, node) {
  node = node.parentElement;
  while (node) {
    if ((0, _matchesSelector2.default)(node, selector)) {
      return node;
    }
    node = node.parentElement;
  }

  return false;
}

exports.default = selectParent;