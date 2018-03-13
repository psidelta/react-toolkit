'use strict';

var _assign = require('../assign');

describe('assign', function () {
  it('extends first object by mutating it and returning a reference to it', function () {
    var a = { a: 2, b: 3 };
    var b = { a: 3, c: 4 };

    var test = (0, _assign.assign)(a, b);
    var expected = { a: 3, b: 3, c: 4 };
    expect(a).toEqual(test);
    expect(test).toEqual(expected);
  });
  it('throws an error when first argument is null or undefined', function () {
    expect(function () {
      return (0, _assign.assign)(null, {});
    }).toThrow(TypeError);
    expect(function () {
      return (0, _assign.assign)(undefined, {});
    }).toThrow(TypeError);
  });
  it('extends multiple objects, of which can be null/undefined', function () {
    var target = { a: 2 };
    var input = [target, null, undefined, { b: 3, c: null }];
    var expected = { a: 2, b: 3, c: null };
    var test = _assign.assign.apply(undefined, input);
    expect(test).toEqual(expected);
    expect(target).toEqual(target);
  });
});