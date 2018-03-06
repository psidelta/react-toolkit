'use strict';

var _addColor = require('../addColor');

var _addColor2 = _interopRequireDefault(_addColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('addColor', function () {
  it('adds the color at the end if there is enough space', function () {
    expect((0, _addColor2.default)({
      color: 'red',
      palette: ['blue'],
      length: 2
    })).toEqual(['blue', 'red']);
  });
  it('adds the color at the begining if there is not enough space', function () {
    expect((0, _addColor2.default)({
      color: 'red',
      palette: ['blue', 'yellow'],
      length: 2
    })).toEqual(['red', 'yellow']);
  });
  it('if palette is null it must return an array with the color', function () {
    expect((0, _addColor2.default)({
      color: 'red',
      palette: null,
      length: 2
    })).toEqual(['red']);
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