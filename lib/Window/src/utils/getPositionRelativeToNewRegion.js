"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Calculates a new position when relativeToViewport changes.
 * So when window changes position from relative to window to a specific
 * element it should not move from it's place.
 *
 * TODO: Take into account when is fixed and inside a parent with transfor,
 * @param  {[type]} initialPosition           [description]
 * @param  {[type]} initialRegion [description]
 * @param  {[type]} finalRegion        [description]
 * @return {[type]}                           [description]
 */
function getPositionRelativeToNewRegion(_ref) {
  var initialPosition = _ref.initialPosition,
      initialRegion = _ref.initialRegion,
      finalRegion = _ref.finalRegion;

  var position = {};
  var verticalCorrection = initialRegion.top - finalRegion.top;
  var horizontalCorrection = initialRegion.left - finalRegion.left;
  if (initialPosition.top !== undefined) {
    position.top = verticalCorrection + initialPosition.top;
  }
  if (initialPosition.bottom !== undefined) {
    position.bottom = initialPosition.bottom - verticalCorrection;
  }
  if (initialPosition.left !== undefined) {
    position.left = horizontalCorrection + initialPosition.left;
  }
  if (initialPosition.right !== undefined) {
    position.right = initialPosition.right - horizontalCorrection;
  }

  return position;
}

exports.default = getPositionRelativeToNewRegion;