'use strict';

var _normalizePalette = require('../normalizePalette');

var _normalizePalette2 = _interopRequireDefault(_normalizePalette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('normalizePalette', function () {
  it('should fill empty spaces with white', function () {
    var input = {
      length: 4,
      palette: ['#bbb']
    };
    var test = ['#bbb', '#fff', '#fff', '#fff'];
    expect((0, _normalizePalette2.default)(input)).to.deep.equal(test);
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