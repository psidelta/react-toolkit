'use strict';

var _getNewSingleValue = require('../getNewSingleValue');

var _getNewSingleValue2 = _interopRequireDefault(_getNewSingleValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getNewSingleValue', function () {
  it('returns correct new value', function () {
    expect((0, _getNewSingleValue2.default)({ id: 1, value: 3 })).to.equal(1);
    expect((0, _getNewSingleValue2.default)({ id: 3, value: 3 })).to.equal(null);
    expect((0, _getNewSingleValue2.default)({ id: 3, value: null })).to.equal(3);
  });
});