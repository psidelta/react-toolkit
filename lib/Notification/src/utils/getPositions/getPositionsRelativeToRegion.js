"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Takes in account the position of the region
 * and corrects the positions to be relative to it.
    (referenceRegion.height - region.bottom) = css relative bottom
    bacuse region.bottom is the distance from top to bottom
*/
function getPositionsRelativeToRegion(_ref) {
  var region = _ref.region,
      positions = _ref.positions;

  return positions.map(function (position) {
    var newPosition = {};

    var viewportWidth = Math.max(0,
    // document.documentElement.clientWidth,
    window.innerWidth || 0);
    var viewportHeight = Math.max(0,
    // document.documentElement.clientHeight,
    window.innerHeight || 0);
    // debugger;

    if (position.bottom !== undefined) {
      newPosition.bottom = position.bottom + (viewportHeight - region.bottom);
    }

    if (position.top !== undefined) {
      newPosition.top = position.top + region.top;
    }

    if (position.left !== undefined) {
      newPosition.left = position.left + region.left;
    }

    if (position.right !== undefined) {
      newPosition.right = position.right + (viewportWidth - region.right);
    }

    return newPosition;
  });
}

exports.default = getPositionsRelativeToRegion;