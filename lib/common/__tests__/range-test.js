'use strict';

var _range = require('../range');

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('range', function () {
  it('constructs correct ranges', function () {
    expect((0, _range2.default)(1, 10)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect((0, _range2.default)(10, 110, 10)).to.deep.equal([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  });
});