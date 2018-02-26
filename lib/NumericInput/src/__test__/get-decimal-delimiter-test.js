'use strict';

var _getDecimalDelimiter = require('../utils/get-decimal-delimiter');

var _getDecimalDelimiter2 = _interopRequireDefault(_getDecimalDelimiter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getDecimalDelimiter utils function', function () {
  it('should get decimal character when no locale used', function () {
    var delimiter = (0, _getDecimalDelimiter2.default)();
    expect(delimiter).to.not.be.falsy;
  });

  it('should get decimal character "." for en-GB locale', function () {
    var delimiter = (0, _getDecimalDelimiter2.default)('en-GB');
    expect(delimiter).to.be.equal('.');
  });

  it('should get decimal character "," for ro-RO locale', function () {
    var delimiter = (0, _getDecimalDelimiter2.default)('ro-RO');
    expect(delimiter).to.be.equal(',');
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