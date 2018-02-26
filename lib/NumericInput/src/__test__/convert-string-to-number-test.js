'use strict';

var _convertStringToNumber = require('../utils/convert-string-to-number');

var _convertStringToNumber2 = _interopRequireDefault(_convertStringToNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('convertStringToNumber utils function', function () {
  it('should convert numbers without any special deilimitors', function () {
    var number = (0, _convertStringToNumber2.default)('1000');
    expect(number).to.equal(1000);
  });

  it('should convert empty/nan/falsy strings', function () {
    expect((0, _convertStringToNumber2.default)()).to.be.NaN;
    expect((0, _convertStringToNumber2.default)('x')).to.be.NaN;
  });

  it('should convert number strings keeping in mind decimal delimiter', function () {
    var number1 = (0, _convertStringToNumber2.default)('1000.00');
    expect(number1).to.equal(1000);

    var number2 = (0, _convertStringToNumber2.default)('1000.05');
    expect(number2).to.equal(1000.05);

    var number3 = (0, _convertStringToNumber2.default)('1000.05', {
      decimalDelimiter: '.'
    });

    expect(number3).to.equal(1000.05);

    var number4 = (0, _convertStringToNumber2.default)('1000,05', {
      decimalDelimiter: ','
    });

    expect(number4).to.equal(1000.05);

    var number5 = (0, _convertStringToNumber2.default)('1000,00', {
      decimalDelimiter: ','
    });

    expect(number5).to.equal(1000);
  });

  it('should convert numbers having group delimiters', function () {
    var reversedDelimiters = {
      decimalDelimiter: ',',
      digitGroupDelimiter: '.'
    };

    var number1 = (0, _convertStringToNumber2.default)('100.000', reversedDelimiters);
    expect(number1, '\'100.000\' -> ' + number1).to.equal(100000);

    var number1b = (0, _convertStringToNumber2.default)('100,000');
    expect(number1b, '\'100.000\' -> ' + number1b).to.equal(100000);

    var number2 = (0, _convertStringToNumber2.default)('1.0.0...005', reversedDelimiters);
    expect(number2, '\'100.000\' -> ' + number2).to.equal(100005);

    var number2b = (0, _convertStringToNumber2.default)('1,0,0,,,005');
    expect(number2b, '\'100.000\' -> ' + number2b).to.equal(100005);
  });

  it('should convert numbers having group delimiters and decimal delimiters', function () {
    var reversedDelimiters = {
      decimalDelimiter: ',',
      digitGroupDelimiter: '.'
    };

    var number1 = (0, _convertStringToNumber2.default)('100.000,00', reversedDelimiters);
    expect(number1).to.equal(100000);

    var number2 = (0, _convertStringToNumber2.default)('1.0.0...005,05', reversedDelimiters);
    expect(number2).to.equal(100005.05);

    var number1b = (0, _convertStringToNumber2.default)('100,000.00');
    expect(number1b).to.equal(100000);

    var number2b = (0, _convertStringToNumber2.default)('1,0,0,,,005.05');
    expect(number2b).to.equal(100005.05);
  });

  describe('min/max values', function () {
    var minMaxParams = {
      min: 1000,
      max: 2000
    };

    it('should handle min values', function () {
      var minEdgeNumber = (0, _convertStringToNumber2.default)('1000', minMaxParams);
      expect(minEdgeNumber).to.equal(1000);

      var underMinEdgeNumber = (0, _convertStringToNumber2.default)('999.9', minMaxParams);
      expect(underMinEdgeNumber).to.equal(1000);
    });

    it('should handle max values', function () {
      var validNumber = (0, _convertStringToNumber2.default)('1500.2', minMaxParams);
      expect(validNumber).to.equal(1500.2);

      var maxEdgeNumber = (0, _convertStringToNumber2.default)('2000', minMaxParams);
      expect(maxEdgeNumber).to.equal(2000);

      var overMaxEdgeNumber = (0, _convertStringToNumber2.default)('2000.1', minMaxParams);
      expect(overMaxEdgeNumber).to.equal(2000);
    });
  });
}); /**
     * Copyright 2015-present Zippy Technologies
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *   http://www.apache.org/licenses/LICENSE-2.0
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */