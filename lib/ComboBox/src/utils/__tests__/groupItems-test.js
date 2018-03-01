'use strict';

var _groupItems = require('../groupItems');

var _groupItems2 = _interopRequireDefault(_groupItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('groupItems', function () {
  it('separates items into two groups', function () {
    var items = [1, 2, 3, 4, 5];
    var maxTagsLength = 3;
    expect((0, _groupItems2.default)({ items: items, maxTagsLength: maxTagsLength })).to.deep.equal({
      visibleItems: [1, 2, 3],
      remainingItems: [4, 5]
    });
  });
  it('separates in one grop when maxTagsLength === 0', function () {
    var items = [1, 2, 3, 4, 5];
    var maxTagsLength = 0;
    expect((0, _groupItems2.default)({ items: items, maxTagsLength: maxTagsLength })).to.deep.equal({
      visibleItems: [],
      remainingItems: [1, 2, 3, 4, 5]
    });
  });
});