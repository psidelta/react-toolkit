'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getStepTickDirection(direction, orientation) {
  /**
   *  if vertical and direction is 1
   *  flip
   * 
   * if vertical and and direction -1
   * do nothing
   */
  if (orientation === 'vertical') {
    return direction === 1 ? -1 : 1;
  }

  /**
   * horizontal and direction -1
   * flip
   * 
   * horizontal and direction 1
   * do nothing
   */
  if (orientation === 'horizontal') {
    return direction;
  }
}

exports.default = getStepTickDirection;