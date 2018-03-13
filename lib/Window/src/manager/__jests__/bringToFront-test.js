'use strict';

var _bringToFront = require('../bringToFront');

var _bringToFront2 = _interopRequireDefault(_bringToFront);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('bringToFront', function () {
  it('should return a new list with item in front (last)', function () {
    var list = [1, 2, 3];
    var expected = [1, 3, 2];

    expect((0, _bringToFront2.default)(2, list)).toEqual(expected);
  });
});