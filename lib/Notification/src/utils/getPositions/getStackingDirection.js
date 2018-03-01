'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Determines the general direction of the stacking.
 *
 * @param  {array} stacking stacking
 * @return {array} general direction stacking
 */
function getStackingDirection(stacking) {
  var stackingDirection = void 0;
  if (stacking.length === 1) {
    stackingDirection = stacking[0] === 'top' || stacking[0] === 'bottom' ? ['vertical'] : ['horizontal'];
  } else {
    stackingDirection = stacking[0] === 'top' || stacking[0] === 'bottom' ? ['vertical', 'horizontal'] : ['horizontal', 'vertical'];
  }
  return stackingDirection;
}

exports.default = getStackingDirection;