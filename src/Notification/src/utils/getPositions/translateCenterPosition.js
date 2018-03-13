/**
 * Adjusts the sizes of the boxes taking into account their offset.
 * @param {[type]} boxes [description]
 */

/**
 * Translates:
 * top-center => bottom-right
 * left-center => right-bottom
 * right-center => left-bottom
 * bottom-center => top-right
 */
function translateCenterPosition(stacking) {
  const [firstDirection] = stacking;
  let newStacking;

  switch (firstDirection) {
    case 'top':
      newStacking = ['bottom', 'right'];
      break;
    case 'left':
      newStacking = ['right', 'top'];
      break;
    case 'right':
      newStacking = ['left', 'bottom'];
      break;
    case 'bottom':
      newStacking = ['top', 'right'];
      break;
  }

  return newStacking;
}

export default translateCenterPosition;
