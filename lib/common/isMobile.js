'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hasTouch = require('@zippytech/has-touch');

var _hasTouch2 = _interopRequireDefault(_hasTouch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mobileTest = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

exports.default = _hasTouch2.default && mobileTest;