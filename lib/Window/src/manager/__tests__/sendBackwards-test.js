'use strict';

var _sendBackwards = require('../sendBackwards');

var _sendBackwards2 = _interopRequireDefault(_sendBackwards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sendBackwards', function () {
  it('should bring id one step forward (index--)', function () {
    var list = [1, 2, 3, 4, 5];
    var expected = [1, 2, 4, 3, 5];

    expect((0, _sendBackwards2.default)(4, list)).toEqual(expected);
  });
});