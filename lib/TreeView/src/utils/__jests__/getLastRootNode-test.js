'use strict';

var _getLastRootNode = require('../getLastRootNode');

var _getLastRootNode2 = _interopRequireDefault(_getLastRootNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getLastRootNode', function () {
  it('should return the correct node', function () {
    var visibleNodes = [{ id: 1, parent: null }, { id: 2, parent: null }, { id: 3, parent: {} }, { id: 4, parent: null }, { id: 5, parent: null }];

    expect((0, _getLastRootNode2.default)(1, visibleNodes).id).toEqual(5);
  });
});