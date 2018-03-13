'use strict';

var _getNextNavigableItem = require('../getNextNavigableItem');

var _getNextNavigableItem2 = _interopRequireDefault(_getNextNavigableItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getNextNavigableItem', function () {
  it('should get first non disabled item in 1 direction, from top to bottom', function () {
    var items = [{ disabled: true }, { disabled: true }, { disabled: true }, { disabled: false }, // 3
    { disabled: true }, '-', { disabled: false }, // 6
    { disabled: false }, { disabled: true }];
    expect((0, _getNextNavigableItem2.default)(items, 3, 1)).equal(6);
  });
  it('should get first non disabled item in -1 direction, from bottom to top', function () {
    var items = [{ disabled: true }, { disabled: true }, { disabled: true }, { disabled: false }, // 3
    '-', { disabled: true }, { disabled: false }, // 6
    { disabled: false }, { disabled: true }];
    expect((0, _getNextNavigableItem2.default)(items, 6, -1)).equal(3);
  });
});