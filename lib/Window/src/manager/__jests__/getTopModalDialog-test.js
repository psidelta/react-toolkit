'use strict';

var _getTopModalWindow = require('../getTopModalWindow');

var _getTopModalWindow2 = _interopRequireDefault(_getTopModalWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getTopModalWindow', function () {
  it('should return top most modal id', function () {
    var list = [1, 2, 3, 4, 5];
    var instances = {
      1: { props: {} },
      5: { props: {} },
      4: { props: { modal: true } },
      2: { props: { modal: true } },
      3: { props: {} }
    };
    var expected = 4;

    expect((0, _getTopModalWindow2.default)(list, instances)).toEqual(expected);
  });
});