'use strict';

var _region = require('@zippytech/region');

var _region2 = _interopRequireDefault(_region);

var _adjustRegionOffset = require('../adjustRegionOffset');

var _adjustRegionOffset2 = _interopRequireDefault(_adjustRegionOffset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('adjustRegionOffset', function () {
  it('returns a new region with given offset', function () {
    var region = _region2.default.from({
      top: 0,
      left: 0,
      bottom: 100,
      right: 100
    });

    var offset = 10;

    var expected = _region2.default.from({
      left: 10,
      top: 10,
      bottom: 90,
      right: 90
    });

    var test = (0, _adjustRegionOffset2.default)({ region: region, offset: offset });
    expect(expected.equals(test)).to.be.true;
  });
});