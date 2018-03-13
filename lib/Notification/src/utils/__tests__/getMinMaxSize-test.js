'use strict';

var _getMinMaxSize = require('../getMinMaxSize');

var _getMinMaxSize2 = _interopRequireDefault(_getMinMaxSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getMinMaxSize', function () {
  it('constructs correct config object with single value', function () {
    expect((0, _getMinMaxSize2.default)({
      minSize: 20
    })).toEqual({
      minWidth: 20,
      minHeight: 20
    });

    expect((0, _getMinMaxSize2.default)({
      maxSize: 20
    })).toEqual({
      maxWidth: 20,
      maxHeight: 20
    });

    expect((0, _getMinMaxSize2.default)({
      maxSize: 20,
      minSize: 22
    })).toEqual({
      maxWidth: 20,
      maxHeight: 20,
      minWidth: 22,
      minHeight: 22
    });
  });

  it('constructs correct config object with one key set', function () {
    expect((0, _getMinMaxSize2.default)({
      minSize: { width: 20, height: 22 }
    })).toEqual({
      minWidth: 20,
      minHeight: 22
    });

    expect((0, _getMinMaxSize2.default)({
      minSize: { width: 20 }
    })).toEqual({
      minWidth: 20
    });

    expect((0, _getMinMaxSize2.default)({
      maxSize: { width: 20, height: 22 }
    })).toEqual({
      maxWidth: 20,
      maxHeight: 22
    });

    expect((0, _getMinMaxSize2.default)({
      maxSize: { width: 20, height: 22 },
      minSize: { width: 21, height: 24 }
    })).toEqual({
      maxWidth: 20,
      maxHeight: 22,
      minWidth: 21,
      minHeight: 24
    });
  });
});