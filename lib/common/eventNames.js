'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isMobile = require('./isMobile');

var _isMobile2 = _interopRequireDefault(_isMobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _isMobile2.default ? {
  onMouseDown: 'onTouchStart',
  onMouseUp: 'onTouchEnd',
  onMouseMove: 'onTouchMove'
} : {
  onMouseDown: 'onMouseDown',
  onMouseUp: 'onMouseUp',
  onMouseMove: 'onMouseMove'
};