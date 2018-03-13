'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PaginationToolbar = require('./PaginationToolbar');

Object.keys(_PaginationToolbar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PaginationToolbar[key];
    }
  });
});

var _PaginationToolbar2 = _interopRequireDefault(_PaginationToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PaginationToolbar2.default;