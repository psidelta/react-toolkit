'use strict';

var _getFirstNonDisabledItem = require('../getFirstNonDisabledItem');

var _getFirstNonDisabledItem2 = _interopRequireDefault(_getFirstNonDisabledItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getFirstNonDisabledItem', function () {
  it('should return the first non disabled index', function () {
    var items = [{ disabled: true }, { disabled: true }, { disabled: true }, {} // 3
    ];

    expect((0, _getFirstNonDisabledItem2.default)(items)).to.equal(3);
  });
  it('should return null if all elements are disabled', function () {
    var items = [{ disabled: true }, { disabled: true }, { disabled: true }];
    expect((0, _getFirstNonDisabledItem2.default)(items)).to.be.null;
  });
});