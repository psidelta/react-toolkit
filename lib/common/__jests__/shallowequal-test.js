'use strict';

var _shallowequal = require('../shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('shallowequal', function () {
  it('returns true if it is the same object', function () {
    var a = {};
    expect((0, _shallowequal2.default)(a, a)).toBe(true);
    expect((0, _shallowequal2.default)(null, null)).toBe(true);
  });
  it('returns false if any of them a is null or not an object', function () {
    expect((0, _shallowequal2.default)({}, null)).toBe(false);
    expect((0, _shallowequal2.default)(null, {})).toBe(false);
  });
  it('returns true when the keys of the objects are the same', function () {
    var a = { a: 2, b: 3 };
    var b = { a: 2, b: 3 };
    expect((0, _shallowequal2.default)(a, b)).toBe(true);
  });
  it('returns false if object have different key length', function () {
    var a = { a: 2, b: 3 };
    var b = { a: 2, b: 3, c: 3 };
    expect((0, _shallowequal2.default)(a, b)).toBe(false);
  });
  it('returns false if object have one or more keys different', function () {
    var a = { a: 2, b: 3, c: 4 };
    var b = { a: 2, b: 3, c: 3 };
    var c = { a: 2, b: 1, c: 3 };

    expect((0, _shallowequal2.default)(a, b)).toBe(false);
    expect((0, _shallowequal2.default)(a, c)).toBe(false);
  });
});