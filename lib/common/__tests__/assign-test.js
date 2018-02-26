'use strict';

var _assign = require('../assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('assign', function () {
  it('extends first object by mutating it and returning a reference to it', function () {
    var browserAssign = Object.assgin;
    Object.assign = null;

    var a = { a: 2, b: 3 };
    var b = { a: 3, c: 4 };

    var test = (0, _assign2.default)(a, b);
    var expected = { a: 3, b: 3, c: 4 };
    expect(a).to.equal(test);
    expect(test).to.deep.equal(expected);

    Object.assign = browserAssign;
  });
  it('throws an error when first argument is null or undefined', function () {
    expect(function () {
      return (0, _assign2.default)(null, {});
    }).to.throw(TypeError);
    expect(function () {
      return (0, _assign2.default)(undefined, {});
    }).to.throw(TypeError);
  });
  it('extends multiple objects, of which can be null/undefined', function () {
    var target = { a: 2 };
    var input = [target, null, undefined, { b: 3, c: null }];
    var expected = { a: 2, b: 3, c: null };
    var test = _assign2.default.apply(undefined, input);
    expect(test).to.deep.equal(expected);
    expect(target).to.equal(target);
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