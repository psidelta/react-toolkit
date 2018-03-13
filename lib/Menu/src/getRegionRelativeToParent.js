'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regionAlign = require('@zippytech/region-align');

var _regionAlign2 = _interopRequireDefault(_regionAlign);

var _selectParent = require('../../common/selectParent');

var _selectParent2 = _interopRequireDefault(_selectParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRegionRelativeToParent(child, prentClassName) {
  var parent = (0, _selectParent2.default)('.' + prentClassName, child);
  var menuRegion = _regionAlign2.default.from(parent);
  var thisRegion = _regionAlign2.default.from(child);
  return {
    left: thisRegion.left - menuRegion.left,
    top: thisRegion.top - menuRegion.top,
    width: thisRegion.width,
    height: thisRegion.height
  };
}

exports.default = getRegionRelativeToParent;