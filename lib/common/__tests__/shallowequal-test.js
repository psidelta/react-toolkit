'use strict';

var _shallowequal = require('../shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('shallowequal', function () {
  it('returns true if it is the same object', function () {
    var a = {};
    expect((0, _shallowequal2.default)(a, a)).to.be.true;
    expect((0, _shallowequal2.default)(null, null)).to.be.true;
  });
  it('returns false if any of them a is null or not an object', function () {
    expect((0, _shallowequal2.default)({}, null)).to.be.false;
    expect((0, _shallowequal2.default)(null, {})).to.be.false;
  });
  it('returns true when the keys of the objects are the same', function () {
    var a = { a: 2, b: 3 };
    var b = { a: 2, b: 3 };
    expect((0, _shallowequal2.default)(a, b)).to.be.true;
  });
  it('returns false if object have different key length', function () {
    var a = { a: 2, b: 3 };
    var b = { a: 2, b: 3, c: 3 };
    expect((0, _shallowequal2.default)(a, b)).to.be.false;
  });
  it('returns false if object have one or more keys different', function () {
    var a = { a: 2, b: 3, c: 4 };
    var b = { a: 2, b: 3, c: 3 };
    var c = { a: 2, b: 1, c: 3 };

    expect((0, _shallowequal2.default)(a, b)).to.be.false;
    expect((0, _shallowequal2.default)(a, c)).to.be.false;
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