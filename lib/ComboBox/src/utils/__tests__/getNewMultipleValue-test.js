'use strict';

var _getNewMultipleValue = require('../getNewMultipleValue');

var _getNewMultipleValue2 = _interopRequireDefault(_getNewMultipleValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getNewMultipleValue', function () {
  it('returns correct new value', function () {
    expect((0, _getNewMultipleValue2.default)({ id: 1, value: null })).to.deep.equal([1]);
    expect((0, _getNewMultipleValue2.default)({ id: 1, value: [1] })).to.equal(null);
    expect((0, _getNewMultipleValue2.default)({ id: 3, value: [1, 2] })).to.deep.equal([1, 2, 3]);
  });
});