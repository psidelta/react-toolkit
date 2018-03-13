'use strict';

var _convertStringToNumber = require('../utils/convert-string-to-number');

var _convertStringToNumber2 = _interopRequireDefault(_convertStringToNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('convertStringToNumber utils function', function () {
  it('should convert numbers without any special deilimitors', function () {
    var number = (0, _convertStringToNumber2.default)('1000');
    expect(number).toBe(1000);
  });

  it('should convert empty/nan/falsy strings', function () {
    expect((0, _convertStringToNumber2.default)()).toBeNaN();
    expect((0, _convertStringToNumber2.default)('x')).toBeNaN();
  });

  it('should convert number strings keeping in mind decimal delimiter', function () {
    var number1 = (0, _convertStringToNumber2.default)('1000.00');
    expect(number1).toBe(1000);

    var number2 = (0, _convertStringToNumber2.default)('1000.05');
    expect(number2).toBe(1000.05);

    var number3 = (0, _convertStringToNumber2.default)('1000.05', {
      decimalDelimiter: '.'
    });

    expect(number3).toBe(1000.05);

    var number4 = (0, _convertStringToNumber2.default)('1000,05', {
      decimalDelimiter: ','
    });

    expect(number4).toBe(1000.05);

    var number5 = (0, _convertStringToNumber2.default)('1000,00', {
      decimalDelimiter: ','
    });

    expect(number5).toBe(1000);
  });

  it('should convert numbers having group delimiters', function () {
    var reversedDelimiters = {
      decimalDelimiter: ',',
      digitGroupDelimiter: '.'
    };

    var number1 = (0, _convertStringToNumber2.default)('100.000', reversedDelimiters);
    expect(number1).toBe(100000);

    var number1b = (0, _convertStringToNumber2.default)('100,000');
    expect(number1b).toBe(100000);

    var number2 = (0, _convertStringToNumber2.default)('1.0.0...005', reversedDelimiters);
    expect(number2).toBe(100005);

    var number2b = (0, _convertStringToNumber2.default)('1,0,0,,,005');
    expect(number2b).toBe(100005);
  });

  it('should convert numbers having group delimiters and decimal delimiters', function () {
    var reversedDelimiters = {
      decimalDelimiter: ',',
      digitGroupDelimiter: '.'
    };

    var number1 = (0, _convertStringToNumber2.default)('100.000,00', reversedDelimiters);
    expect(number1).toBe(100000);

    var number2 = (0, _convertStringToNumber2.default)('1.0.0...005,05', reversedDelimiters);
    expect(number2).toBe(100005.05);

    var number1b = (0, _convertStringToNumber2.default)('100,000.00');
    expect(number1b).toBe(100000);

    var number2b = (0, _convertStringToNumber2.default)('1,0,0,,,005.05');
    expect(number2b).toBe(100005.05);
  });

  describe('min/max values', function () {
    var minMaxParams = {
      min: 1000,
      max: 2000
    };

    it('should handle min values', function () {
      var minEdgeNumber = (0, _convertStringToNumber2.default)('1000', minMaxParams);
      expect(minEdgeNumber).toBe(1000);

      var underMinEdgeNumber = (0, _convertStringToNumber2.default)('999.9', minMaxParams);
      expect(underMinEdgeNumber).toBe(1000);
    });

    it('should handle max values', function () {
      var validNumber = (0, _convertStringToNumber2.default)('1500.2', minMaxParams);
      expect(validNumber).toBe(1500.2);

      var maxEdgeNumber = (0, _convertStringToNumber2.default)('2000', minMaxParams);
      expect(maxEdgeNumber).toBe(2000);

      var overMaxEdgeNumber = (0, _convertStringToNumber2.default)('2000.1', minMaxParams);
      expect(overMaxEdgeNumber).toBe(2000);
    });
  });
});