'use strict';

var _getDecimalDelimiter = require('../utils/get-decimal-delimiter');

var _getDecimalDelimiter2 = _interopRequireDefault(_getDecimalDelimiter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getDecimalDelimiter utils function', function () {
  it('should get decimal character when no locale used', function () {
    var delimiter = (0, _getDecimalDelimiter2.default)();
    expect(!!delimiter).toBe(true);
  });

  it('should get decimal character "." for en-GB locale', function () {
    var delimiter = (0, _getDecimalDelimiter2.default)('en-GB');
    expect(delimiter).toBe('.');
  });

  xit('should get decimal character "," for ro-RO locale', function () {
    var delimiter = (0, _getDecimalDelimiter2.default)('ro-RO');
    expect(delimiter).toBe(',');
  });
});