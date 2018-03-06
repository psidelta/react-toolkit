'use strict';

var _getGroupedItems = require('../getGroupedItems');

var _getGroupedItems2 = _interopRequireDefault(_getGroupedItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getGroupedItems', function () {
  it('returns the full list when all items fit', function () {
    var boxes = [30, 20, 20, 30];
    var maxSize = 100;
    var test = (0, _getGroupedItems2.default)({ boxes: boxes, maxSize: maxSize });
    expect(test).to.be.false;
  });
  it('separates corecty the indexes in visible and overflowItems', function () {
    var boxes = [20, 30, 30, 30];
    var maxSize = 100;
    var test = (0, _getGroupedItems2.default)({ boxes: boxes, maxSize: maxSize });

    expect(test.visibleIndexes).toEqual([0, 1, 2]);
    expect(test.overflowIndexes).toEqual([3]);
  });
  it('overflow control can make one item more to overflow', function () {
    var boxes = [30, 30, 30, 30];
    var maxSize = 100;
    var overflowControlSize = 20;
    var test = (0, _getGroupedItems2.default)({ boxes: boxes, maxSize: maxSize, overflowControlSize: overflowControlSize });

    expect(test.visibleIndexes).toEqual([0, 1]);
    expect(test.overflowIndexes).toEqual([2, 3]);
  });
});