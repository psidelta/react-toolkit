/**
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

import getTransformedStringValues from '../utils/get-transformed-string-values';

describe('getTransformedStringValues utils function', () => {
  describe('particular edge cases', () => {
    it('(-) -> [-, null]', () => {
      const number = '-';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('-');
      expect(numericValue).to.equal(null);
    });

    it('( ) -> ["", null]', () => {
      const number = '';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('');
      expect(numericValue).to.equal(null);
    });

    it('(.) -> [., null]', () => {
      const number = '.';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('.');
      expect(numericValue).to.equal(null);
    });

    it('(-.) -> [-., null]', () => {
      const number = '-.';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('-.');
      expect(numericValue).to.equal(null);
    });

    it('(-.a) -> [-., null]', () => {
      const number = '-.a';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('-.');
      expect(numericValue).to.equal(null);
    });
  });

  describe('working with integers', () => {
    it('should return same string when sending positive', () => {
      const number = '1,000';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(number).to.equal(formattedValue);
    });

    it('should return formated string when sending un-formatted positive', () => {
      const number = '1000';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('1,000');
    });

    it('should return negative number', () => {
      const number = '-1,520';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('-1,520');
    });
  });

  describe('working with decimals', () => {
    it('should return same string', () => {
      const number = '1,000.55';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(number).to.equal(formattedValue);

      const number2 = '1,000.00';
      const [formattedValue2, numericValue2] = getTransformedStringValues(
        number2
      );
      expect(number2).to.equal(formattedValue2);
    });

    it('should format string', () => {
      const number = '1000.55';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('1,000.55');

      const number2 = '1000.00';
      const [formattedValue2, numericValue2] = getTransformedStringValues(
        number2
      );
      expect(formattedValue2).to.equal('1,000.00');
    });

    it('(1000.) -> [1000., 1000] should support typing "." after integer number', () => {
      const number = '1000.';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('1,000.');
      expect(numericValue).to.equal(1000);
    });

    it('(1000.1) -> [1000.1, 1000.1]', () => {
      const number = '1000.1';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('1,000.1');
      expect(numericValue).to.equal(1000.1);
    });

    it('(1000.0) -> [1000.0, 1000]', () => {
      const number = '1000.0';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('1,000.0');
      expect(numericValue).to.equal(1000);
    });

    it('(.03) -> [0.03, 0.03] should support typing "." followed by fractional digits', () => {
      const number = '.03';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('0.03');
      expect(numericValue).to.equal(0.03);
    });

    it('(.0) -> [0.0, 0] should support typing "." followed by 0s', () => {
      const number = '.0';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('0.0');
      expect(numericValue).to.equal(0);
    });

    it('(-.1) -> [-0.1, -0.1] should support typing "." followed by 0s', () => {
      const number = '-.1';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('-0.1');
      expect(numericValue).to.equal(-0.1);
    });

    it('(0.a) -> [0., 0]', () => {
      const number = '0.a';
      const [formattedValue, numericValue] = getTransformedStringValues(number);
      expect(formattedValue).to.equal('0.');
      expect(numericValue).to.equal(0);
    });
  });

  describe('working with precision (inputString, precision) -> [outputStirng, outputNumber]', () => {
    it('(1,000.0002, 3) -> [1000.000, 1000]', () => {
      const number = '1,000.0002';
      const [
        formattedValue,
        numericValue
      ] = getTransformedStringValues(number, {
        precision: 3
      });
      expect(formattedValue).to.equal('1,000.000');
      expect(numericValue).to.equal(1000);
    });

    it('(1,000.0032, 3) -> [1000.003, 1000.003]', () => {
      const number = '1,000.0032';
      const [
        formattedValue,
        numericValue
      ] = getTransformedStringValues(number, {
        precision: 3
      });
      expect(formattedValue, `${formattedValue}->1,000.003?`).to.equal(
        '1,000.003'
      );
      expect(numericValue).to.equal(1000.003);
    });

    it('(1,000.0032, 6) -> [1,000.003200, 1000.003200]', () => {
      const number = '1,000.0032';
      const [
        formattedValue,
        numericValue
      ] = getTransformedStringValues(number, {
        precision: 6
      });
      expect(formattedValue).to.equal('1,000.003200');
      expect(numericValue).to.equal(1000.003200);
    });

    it('(1.) -> [1.000, 1.000]', () => {
      const number = '1.';
      const [
        formattedValue,
        numericValue
      ] = getTransformedStringValues(number, {
        precision: 3
      });
      expect(formattedValue).to.equal('1.000');
      expect(numericValue).to.equal(1.000);
    });
  });

  describe('working with min/max input, min, max, [precision -> output, outpun number]', () => {
    it('(-1000.53, -500, 5000, 6) -> [-500.000000, -500]', () => {
      const number = '-1000.53';
      const [
        formattedValue,
        numericValue
      ] = getTransformedStringValues(number, {
        precision: 6,
        min: -500,
        max: 5000
      });
      expect(formattedValue).to.equal('-500.000000');
      expect(numericValue).to.equal(-500);
    });
    it('(5000.53, -500, 5000, 6) -> [-500.000000, -500]', () => {
      const number = '5000.53';
      const [
        formattedValue,
        numericValue
      ] = getTransformedStringValues(number, {
        precision: 6,
        min: -500,
        max: 5000
      });
      expect(formattedValue).to.equal('5,000.000000');
      expect(numericValue).to.equal(5000);
    });
  });
});
