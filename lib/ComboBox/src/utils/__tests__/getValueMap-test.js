'use strict';

var _getValueMap = require('../getValueMap');

var _getValueMap2 = _interopRequireDefault(_getValueMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getValueMap', function () {
  it('adds new values and removes ones that are no longer present, and keeps the ones already in', function () {
    var dataMap = {
      1: { id: 1 },
      2: { id: 2 },
      3: { id: 3 },
      4: { id: 4 }
    };
    var value = [1, 2, 3];
    var test = (0, _getValueMap2.default)({
      value: value,
      dataMap: dataMap,
      oldvalueMap: {
        4: { id: 4 },
        2: { id: 2 }
      }
    });

    expect(test).to.deep.equal({
      1: { id: 1 },
      3: { id: 3 },
      2: { id: 2 }
    });
  });
  it('works width single select', function () {
    var dataMap = {
      1: { id: 1 },
      2: { id: 2 },
      3: { id: 3 },
      4: { id: 4 }
    };
    var value = 2;
    var test = (0, _getValueMap2.default)({
      value: value,
      dataMap: dataMap,
      oldvalueMap: {
        4: { id: 4 }
      }
    });

    expect(test).to.deep.equal({
      2: { id: 2 }
    });
  });
});