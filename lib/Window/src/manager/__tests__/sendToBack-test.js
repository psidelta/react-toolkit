'use strict';

var _sendToBack = require('../sendToBack');

var _sendToBack2 = _interopRequireDefault(_sendToBack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sendToBack', function () {
  it('should return a new list with item in front (last)', function () {
    var list = [1, 2, 3];
    var expected = [2, 1, 3];

    expect((0, _sendToBack2.default)(2, list)).to.deep.equal(expected);
  });
});