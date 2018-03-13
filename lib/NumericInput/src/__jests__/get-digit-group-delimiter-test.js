'use strict';

var _getDigitGroupDelimiter = require('../utils/get-digit-group-delimiter');

var _getDigitGroupDelimiter2 = _interopRequireDefault(_getDigitGroupDelimiter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getDigitGroup utils function', function () {
  it('should get decimal character when no locale used', function () {
    var delimiter = (0, _getDigitGroupDelimiter2.default)();
    expect(!!delimiter).toBe(true);
  });

  it('should get digit group character "," for en-GB locale', function () {
    var delimiter = (0, _getDigitGroupDelimiter2.default)('en-GB');
    expect(delimiter).toBe(',');
  });

  xit('should get digit group character "." for ro-RO locale', function () {
    var delimiter = (0, _getDigitGroupDelimiter2.default)('ro-RO');
    expect(delimiter).toBe('.');
  });
});