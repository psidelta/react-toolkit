'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getConstrainRegion = require('../../../common/getConstrainRegion');

var _getConstrainRegion2 = _interopRequireDefault(_getConstrainRegion);

var _prepareAlignOffset = require('../utils/prepareAlignOffset');

var _prepareAlignOffset2 = _interopRequireDefault(_prepareAlignOffset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props, subMenuRegion, targetAlignRegion, constrainTo, domNode) {
  var constrainRegion = _getConstrainRegion2.default.call(undefined, constrainTo, domNode);
  // if (!constrainRegion) {
  //   return;
  // }

  if (typeof props.alignSubMenu === 'function') {
    props.alignSubMenu(subMenuRegion, targetAlignRegion, constrainRegion);
  } else {
    var alignPositions = props.alignPositions;

    var offset = props.rtl ? props.rtlSubmenuAlignOffset : props.submenuAlignOffset;

    offset = (0, _prepareAlignOffset2.default)(offset, alignPositions.length);

    var pos = subMenuRegion.alignTo(targetAlignRegion, alignPositions, {
      offset: offset,
      constrain: constrainRegion
    });

    return pos == 'tl-tr' || pos == 'tr-tl' ? // align downwards
    1 : // align upwards
    -1;
  }
};