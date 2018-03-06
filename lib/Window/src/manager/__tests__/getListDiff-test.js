'use strict';

var _getListDiff = require('../getListDiff');

var _getListDiff2 = _interopRequireDefault(_getListDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getListDiff', function () {
  it('should return items that have changed place', function () {
    var list = [2, 1, 3, 5];
    var previous = [1, 2, 3, 4, 5];
    var expected = [2, 1, 5];

    expect((0, _getListDiff2.default)(list, previous)).toEqual(expected);
  });
});