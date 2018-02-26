'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
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

var _getTransformedStringValues = require('../utils/get-transformed-string-values');

var _getTransformedStringValues2 = _interopRequireDefault(_getTransformedStringValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getTransformedStringValues utils function', function () {
  describe('particular edge cases', function () {
    it('(-) -> [-, null]', function () {
      var number = '-';

      var _getTransformedString = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString2 = _slicedToArray(_getTransformedString, 2),
          formattedValue = _getTransformedString2[0],
          numericValue = _getTransformedString2[1];

      expect(formattedValue).to.equal('-');
      expect(numericValue).to.equal(null);
    });

    it('( ) -> ["", null]', function () {
      var number = '';

      var _getTransformedString3 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString4 = _slicedToArray(_getTransformedString3, 2),
          formattedValue = _getTransformedString4[0],
          numericValue = _getTransformedString4[1];

      expect(formattedValue).to.equal('');
      expect(numericValue).to.equal(null);
    });

    it('(.) -> [., null]', function () {
      var number = '.';

      var _getTransformedString5 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString6 = _slicedToArray(_getTransformedString5, 2),
          formattedValue = _getTransformedString6[0],
          numericValue = _getTransformedString6[1];

      expect(formattedValue).to.equal('.');
      expect(numericValue).to.equal(null);
    });

    it('(-.) -> [-., null]', function () {
      var number = '-.';

      var _getTransformedString7 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString8 = _slicedToArray(_getTransformedString7, 2),
          formattedValue = _getTransformedString8[0],
          numericValue = _getTransformedString8[1];

      expect(formattedValue).to.equal('-.');
      expect(numericValue).to.equal(null);
    });

    it('(-.a) -> [-., null]', function () {
      var number = '-.a';

      var _getTransformedString9 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString10 = _slicedToArray(_getTransformedString9, 2),
          formattedValue = _getTransformedString10[0],
          numericValue = _getTransformedString10[1];

      expect(formattedValue).to.equal('-.');
      expect(numericValue).to.equal(null);
    });
  });

  describe('working with integers', function () {
    it('should return same string when sending positive', function () {
      var number = '1,000';

      var _getTransformedString11 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString12 = _slicedToArray(_getTransformedString11, 2),
          formattedValue = _getTransformedString12[0],
          numericValue = _getTransformedString12[1];

      expect(number).to.equal(formattedValue);
    });

    it('should return formated string when sending un-formatted positive', function () {
      var number = '1000';

      var _getTransformedString13 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString14 = _slicedToArray(_getTransformedString13, 2),
          formattedValue = _getTransformedString14[0],
          numericValue = _getTransformedString14[1];

      expect(formattedValue).to.equal('1,000');
    });

    it('should return negative number', function () {
      var number = '-1,520';

      var _getTransformedString15 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString16 = _slicedToArray(_getTransformedString15, 2),
          formattedValue = _getTransformedString16[0],
          numericValue = _getTransformedString16[1];

      expect(formattedValue).to.equal('-1,520');
    });
  });

  describe('working with decimals', function () {
    it('should return same string', function () {
      var number = '1,000.55';

      var _getTransformedString17 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString18 = _slicedToArray(_getTransformedString17, 2),
          formattedValue = _getTransformedString18[0],
          numericValue = _getTransformedString18[1];

      expect(number).to.equal(formattedValue);

      var number2 = '1,000.00';

      var _getTransformedString19 = (0, _getTransformedStringValues2.default)(number2),
          _getTransformedString20 = _slicedToArray(_getTransformedString19, 2),
          formattedValue2 = _getTransformedString20[0],
          numericValue2 = _getTransformedString20[1];

      expect(number2).to.equal(formattedValue2);
    });

    it('should format string', function () {
      var number = '1000.55';

      var _getTransformedString21 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString22 = _slicedToArray(_getTransformedString21, 2),
          formattedValue = _getTransformedString22[0],
          numericValue = _getTransformedString22[1];

      expect(formattedValue).to.equal('1,000.55');

      var number2 = '1000.00';

      var _getTransformedString23 = (0, _getTransformedStringValues2.default)(number2),
          _getTransformedString24 = _slicedToArray(_getTransformedString23, 2),
          formattedValue2 = _getTransformedString24[0],
          numericValue2 = _getTransformedString24[1];

      expect(formattedValue2).to.equal('1,000.00');
    });

    it('(1000.) -> [1000., 1000] should support typing "." after integer number', function () {
      var number = '1000.';

      var _getTransformedString25 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString26 = _slicedToArray(_getTransformedString25, 2),
          formattedValue = _getTransformedString26[0],
          numericValue = _getTransformedString26[1];

      expect(formattedValue).to.equal('1,000.');
      expect(numericValue).to.equal(1000);
    });

    it('(1000.1) -> [1000.1, 1000.1]', function () {
      var number = '1000.1';

      var _getTransformedString27 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString28 = _slicedToArray(_getTransformedString27, 2),
          formattedValue = _getTransformedString28[0],
          numericValue = _getTransformedString28[1];

      expect(formattedValue).to.equal('1,000.1');
      expect(numericValue).to.equal(1000.1);
    });

    it('(1000.0) -> [1000.0, 1000]', function () {
      var number = '1000.0';

      var _getTransformedString29 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString30 = _slicedToArray(_getTransformedString29, 2),
          formattedValue = _getTransformedString30[0],
          numericValue = _getTransformedString30[1];

      expect(formattedValue).to.equal('1,000.0');
      expect(numericValue).to.equal(1000);
    });

    it('(.03) -> [0.03, 0.03] should support typing "." followed by fractional digits', function () {
      var number = '.03';

      var _getTransformedString31 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString32 = _slicedToArray(_getTransformedString31, 2),
          formattedValue = _getTransformedString32[0],
          numericValue = _getTransformedString32[1];

      expect(formattedValue).to.equal('0.03');
      expect(numericValue).to.equal(0.03);
    });

    it('(.0) -> [0.0, 0] should support typing "." followed by 0s', function () {
      var number = '.0';

      var _getTransformedString33 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString34 = _slicedToArray(_getTransformedString33, 2),
          formattedValue = _getTransformedString34[0],
          numericValue = _getTransformedString34[1];

      expect(formattedValue).to.equal('0.0');
      expect(numericValue).to.equal(0);
    });

    it('(-.1) -> [-0.1, -0.1] should support typing "." followed by 0s', function () {
      var number = '-.1';

      var _getTransformedString35 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString36 = _slicedToArray(_getTransformedString35, 2),
          formattedValue = _getTransformedString36[0],
          numericValue = _getTransformedString36[1];

      expect(formattedValue).to.equal('-0.1');
      expect(numericValue).to.equal(-0.1);
    });

    it('(0.a) -> [0., 0]', function () {
      var number = '0.a';

      var _getTransformedString37 = (0, _getTransformedStringValues2.default)(number),
          _getTransformedString38 = _slicedToArray(_getTransformedString37, 2),
          formattedValue = _getTransformedString38[0],
          numericValue = _getTransformedString38[1];

      expect(formattedValue).to.equal('0.');
      expect(numericValue).to.equal(0);
    });
  });

  describe('working with precision (inputString, precision) -> [outputStirng, outputNumber]', function () {
    it('(1,000.0002, 3) -> [1000.000, 1000]', function () {
      var number = '1,000.0002';

      var _getTransformedString39 = (0, _getTransformedStringValues2.default)(number, {
        precision: 3
      }),
          _getTransformedString40 = _slicedToArray(_getTransformedString39, 2),
          formattedValue = _getTransformedString40[0],
          numericValue = _getTransformedString40[1];

      expect(formattedValue).to.equal('1,000.000');
      expect(numericValue).to.equal(1000);
    });

    it('(1,000.0032, 3) -> [1000.003, 1000.003]', function () {
      var number = '1,000.0032';

      var _getTransformedString41 = (0, _getTransformedStringValues2.default)(number, {
        precision: 3
      }),
          _getTransformedString42 = _slicedToArray(_getTransformedString41, 2),
          formattedValue = _getTransformedString42[0],
          numericValue = _getTransformedString42[1];

      expect(formattedValue, formattedValue + '->1,000.003?').to.equal('1,000.003');
      expect(numericValue).to.equal(1000.003);
    });

    it('(1,000.0032, 6) -> [1,000.003200, 1000.003200]', function () {
      var number = '1,000.0032';

      var _getTransformedString43 = (0, _getTransformedStringValues2.default)(number, {
        precision: 6
      }),
          _getTransformedString44 = _slicedToArray(_getTransformedString43, 2),
          formattedValue = _getTransformedString44[0],
          numericValue = _getTransformedString44[1];

      expect(formattedValue).to.equal('1,000.003200');
      expect(numericValue).to.equal(1000.003200);
    });

    it('(1.) -> [1.000, 1.000]', function () {
      var number = '1.';

      var _getTransformedString45 = (0, _getTransformedStringValues2.default)(number, {
        precision: 3
      }),
          _getTransformedString46 = _slicedToArray(_getTransformedString45, 2),
          formattedValue = _getTransformedString46[0],
          numericValue = _getTransformedString46[1];

      expect(formattedValue).to.equal('1.000');
      expect(numericValue).to.equal(1.000);
    });
  });

  describe('working with min/max input, min, max, [precision -> output, outpun number]', function () {
    it('(-1000.53, -500, 5000, 6) -> [-500.000000, -500]', function () {
      var number = '-1000.53';

      var _getTransformedString47 = (0, _getTransformedStringValues2.default)(number, {
        precision: 6,
        min: -500,
        max: 5000
      }),
          _getTransformedString48 = _slicedToArray(_getTransformedString47, 2),
          formattedValue = _getTransformedString48[0],
          numericValue = _getTransformedString48[1];

      expect(formattedValue).to.equal('-500.000000');
      expect(numericValue).to.equal(-500);
    });
    it('(5000.53, -500, 5000, 6) -> [-500.000000, -500]', function () {
      var number = '5000.53';

      var _getTransformedString49 = (0, _getTransformedStringValues2.default)(number, {
        precision: 6,
        min: -500,
        max: 5000
      }),
          _getTransformedString50 = _slicedToArray(_getTransformedString49, 2),
          formattedValue = _getTransformedString50[0],
          numericValue = _getTransformedString50[1];

      expect(formattedValue).to.equal('5,000.000000');
      expect(numericValue).to.equal(5000);
    });
  });
});