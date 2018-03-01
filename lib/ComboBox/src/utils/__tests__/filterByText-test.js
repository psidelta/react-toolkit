'use strict';

var _filterByText = require('../filterByText');

var _filterByText2 = _interopRequireDefault(_filterByText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('filterByText', function () {
  it('returns a list that matches text', function () {
    var data = [{ label: 'test' }, { label: 'foo' }, { label: 'bar' }, { label: 'fooBar' }];
    var getFilterProperty = function getFilterProperty(item) {
      return item.label;
    };
    var test = (0, _filterByText2.default)({ data: data, getFilterProperty: getFilterProperty, text: 'foo' });

    expect(test).to.deep.equal([{ label: 'foo' }, { label: 'fooBar' }]);
  });
  it('returns a list that matches text', function () {
    var data = [{ label: 'test' }, { label: 'foo' }, { label: 'bar' }, { label: 'xfooBar' }];
    var getFilterProperty = function getFilterProperty(item) {
      return item.label;
    };
    var test = (0, _filterByText2.default)({
      data: data,
      getFilterProperty: getFilterProperty,
      text: 'foo',
      mode: 'startsWidth'
    });

    expect(test).to.deep.equal([{ label: 'foo' }]);
  });
  it('returns a list with items for which filterFunction returned true', function () {
    var data = [{ label: 'test' }, { label: 'foo' }, { label: 'bar' }, { label: 'fooBar' }];
    var getFilterProperty = function getFilterProperty(item) {
      return item.label;
    };
    var filterFunction = function filterFunction(_ref) {
      var item = _ref.item;
      return item.label === 'foo';
    };
    var test = (0, _filterByText2.default)({
      data: data,
      getFilterProperty: getFilterProperty,
      text: 'foo',
      filterFunction: filterFunction
    });

    expect(test).to.deep.equal([{ label: 'foo' }]);
  });
});