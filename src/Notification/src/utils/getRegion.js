import Region from '@zippytech/region';

function getRegion(region, node) {
  let constrainRegion;

  if (typeof region === 'function') {
    region = region(node);
  }

  if (typeof region === 'object') {
    constrainRegion = Region.from(region);
  }

  if (region === true && global.document) {
    const viewportWidth = Math.max(
      document.documentElement.clientWidth,
      global.innerWidth || 0
    );
    const viewportHeight = Math.max(
      document.documentElement.clientHeight,
      global.innerHeight || 0
    );
    constrainRegion = Region.from({
      top: 0,
      left: 0,
      width: viewportWidth,
      height: viewportHeight
    });
  }

  if (!constrainRegion && typeof region === 'string' && global.document) {
    region = document.querySelector(region);
  }

  if (!constrainRegion) {
    constrainRegion = Region.from(region);
  }

  return constrainRegion;
}

export default getRegion;
