'use strict';

var _getNewActiveTagOnRemove = require('../getNewActiveTagOnRemove');

var _getNewActiveTagOnRemove2 = _interopRequireDefault(_getNewActiveTagOnRemove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getNewActiveTagOnRemove', function () {
  it('returns the correct activeTag after activeTag was removed', function () {
    expect((0, _getNewActiveTagOnRemove2.default)({ id: 2, value: [1, 2, 3] })).to.equal(1);
    expect((0, _getNewActiveTagOnRemove2.default)({ id: 3, value: [1, 2, 3] })).to.equal(2);
    expect((0, _getNewActiveTagOnRemove2.default)({ id: 3, value: [3] })).to.be.null;
  });
});