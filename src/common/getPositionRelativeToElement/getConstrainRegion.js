import Region from '@zippytech/region-align';
import selectParent from '../selectParent';

import getViewportRegion from '../getViewportRegion';

export default function(constrainTo, domNode) {
  let constrainRegion;

  if (constrainTo === true) {
    constrainRegion = getViewportRegion();
  }

  if (!constrainRegion && typeof constrainTo === 'function') {
    constrainTo = Region.from(constrainTo(domNode));
  }

  if (!constrainRegion && typeof constrainTo === 'string') {
    constrainTo = selectParent(constrainTo, domNode);
  }

  if (!constrainRegion && constrainTo) {
    constrainRegion = Region.from(constrainTo);
  }

  return constrainRegion;
}
