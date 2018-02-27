import normalizeOffset from './normalizeOffset';

const adjustRegionOffset = ({ region, offset }) => {
  offset = normalizeOffset(offset);

  const newRegion = region.clone();

  if (offset.top) {
    newRegion.addTop(offset.top);
  }

  if (offset.bottom) {
    newRegion.addBottom(-offset.bottom);
  }

  if (offset.left) {
    newRegion.addLeft(offset.left);
  }

  if (offset.right) {
    newRegion.addRight(-offset.right);
  }

  return newRegion;
};

export default adjustRegionOffset;
