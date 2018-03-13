'use strict';

var _clamp = require('../clamp');

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('clamp', function () {
  it('returns min with value is less than min', function () {
    expect((0, _clamp2.default)(1, 2, 3)).toEqual(2);
  });
  it('returns max with value is bigger than max', function () {
    expect((0, _clamp2.default)(5, 2, 3)).toEqual(3);
  });
  it('returns the same value whe it is in the interval', function () {
    expect((0, _clamp2.default)(4, 2, 5)).toEqual(4);
  });
});