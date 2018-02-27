/*
* adjust positions offset
* it is ok to mutate here
* only top/left must take into account
* offset
*/
function adjustPositionWithOffset(positions) {
  return positions.map(position => {
    if (!position.offset) {
      return position;
    }

    const newPosition = { ...position };
    if (position.offset.top && newPosition.top !== undefined) {
      newPosition.top += newPosition.offset.top;
    }
    if (newPosition.offset.left && newPosition.left !== undefined) {
      newPosition.left += newPosition.offset.left;
    }
    if (position.offset.bottom && newPosition.bottom !== undefined) {
      newPosition.bottom += newPosition.offset.bottom;
    }
    if (
      newPosition.offset.right !== undefined &&
      newPosition.right !== undefined
    ) {
      newPosition.right += newPosition.offset.right;
    }

    return newPosition;
  });
}

export default adjustPositionWithOffset;
