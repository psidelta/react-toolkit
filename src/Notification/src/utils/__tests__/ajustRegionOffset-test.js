import Region from '@zippytech/region';

import adjustRegionOffset from '../adjustRegionOffset';

describe('adjustRegionOffset', () => {
  it('returns a new region with given offset', () => {
    const region = Region.from({
      top: 0,
      left: 0,
      bottom: 100,
      right: 100
    });

    const offset = 10;

    const expected = Region.from({
      left: 10,
      top: 10,
      bottom: 90,
      right: 90
    });

    const test = adjustRegionOffset({ region, offset });
    expect(expected.equals(test)).to.be.true;
  });
});
