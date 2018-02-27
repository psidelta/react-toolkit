import Region from '@zippytech/region';

function getRelativeRegion(domNode) {
  const parentRegion = Region.from(domNode.parentNode);
  const region = Region.from(domNode);

  region.shift({
    left: -parentRegion.left,
    top: -parentRegion.top
  });

  return region;
}

export default getRelativeRegion;
