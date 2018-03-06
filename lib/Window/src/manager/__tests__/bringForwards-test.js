'use strict';

var _bringForwards = require('../bringForwards');

var _bringForwards2 = _interopRequireDefault(_bringForwards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('bringForwards', function () {
  it('should bring id one step forward (index++)', function () {
    var list = [1, 2, 3, 4, 5];
    var expected = [1, 2, 3, 5, 4];

    expect((0, _bringForwards2.default)(4, list)).toEqual(expected);
  });
});