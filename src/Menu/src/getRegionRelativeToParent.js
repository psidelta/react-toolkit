import Region from '@zippytech/region-align';
import selectParent from '../../common/selectParent';

function getRegionRelativeToParent(child, prentClassName) {
  const parent = selectParent(`.${prentClassName}`, child);
  const menuRegion = Region.from(parent);
  const thisRegion = Region.from(child);
  return {
    left: thisRegion.left - menuRegion.left,
    top: thisRegion.top - menuRegion.top,
    width: thisRegion.width,
    height: thisRegion.height
  };
}

export default getRegionRelativeToParent;
