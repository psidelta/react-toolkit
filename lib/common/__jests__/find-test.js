'use strict';

var _find = require('../find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('find', function () {
  it('returns null if the collection is null', function () {
    expect((0, _find2.default)(null, function () {})).toEqual(null);
  });
  it('returns the first item that matches test', function () {
    var test = [{}, null, false, { a: 'test' }];
    expect((0, _find2.default)(test, function (item) {
      return item && item.a === 'test';
    })).toEqual({
      a: 'test'
    });
  });
});