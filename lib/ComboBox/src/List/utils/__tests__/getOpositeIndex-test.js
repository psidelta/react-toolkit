'use strict';

var _getOpositeIndex = require('../getOpositeIndex');

var _getOpositeIndex2 = _interopRequireDefault(_getOpositeIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getOpositeIndex', function () {
  it('returns correct oposite index', function () {
    expect((0, _getOpositeIndex2.default)(0, 20)).to.equal(19);
    expect((0, _getOpositeIndex2.default)(1, 20)).to.equal(18);
    expect((0, _getOpositeIndex2.default)(2, 20)).to.equal(17);
    expect((0, _getOpositeIndex2.default)(18, 20)).to.equal(1);
    expect((0, _getOpositeIndex2.default)(19, 20)).to.equal(0);
  });
});