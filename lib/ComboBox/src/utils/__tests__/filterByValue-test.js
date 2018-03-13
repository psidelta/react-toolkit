'use strict';

var _filterByValue = require('../filterByValue');

var _filterByValue2 = _interopRequireDefault(_filterByValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('filterByValue', function () {
  it('filters out selected items', function () {
    var data = [{ id: 1, label: 'test1' }, { id: 2, label: 'test2' }, { id: 3, label: 'test3' }];
    var expected = [{ id: 2, label: 'test2' }];
    var value = [1, 3];
    var getIdProperty = function getIdProperty(item) {
      return item.id;
    };

    expect((0, _filterByValue2.default)({ data: data, getIdProperty: getIdProperty, value: value })).toEqual(expected);
  });
});