import Region from '@zippytech/region-align';
import selectParent from './selectParent';
import getViewportRegion from './getViewportRegion';

export default (constrainTo, domNode) => {
  let constrainRegion;

  if (constrainTo === true) {
    constrainRegion = getViewportRegion();
  }

  if (!constrainRegion && typeof constrainTo === 'function') {
    constrainTo = constrainTo(domNode);
  }

  if (!constrainRegion && typeof constrainTo === 'string') {
    constrainTo = selectParent(constrainTo, domNode);
  }

  if (!constrainRegion && constrainTo) {
    constrainRegion = Region.from(constrainTo);
  }

  return constrainRegion;
};
