'use strict';

var _normalizeOffset = require('../normalizeOffset');

var _normalizeOffset2 = _interopRequireDefault(_normalizeOffset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('normalizeOffset', function () {
  it('if a number applies the offset to all sides', function () {
    var expected = {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20
    };

    expect((0, _normalizeOffset2.default)(20)).to.deep.equal(expected);
  });
});