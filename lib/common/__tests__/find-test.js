'use strict';

var _find = require('../find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('find', function () {
  it('returns null if the collection is null', function () {
    expect((0, _find2.default)(null, function () {})).to.equal.null;
  });
  it('returns the first item that matches test', function () {
    var test = [{}, null, false, { a: 'test' }];
    expect((0, _find2.default)(test, function (item) {
      return item && item.a === 'test';
    })).to.deep.equal({ a: 'test' });
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