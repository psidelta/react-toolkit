'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _region = require('@zippytech/region');

var _region2 = _interopRequireDefault(_region);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRelativeRegion(domNode) {
  var parentRegion = _region2.default.from(domNode.parentNode);
  var region = _region2.default.from(domNode);

  region.shift({
    left: -parentRegion.left,
    top: -parentRegion.top
  });

  return region;
}

exports.default = getRelativeRegion;