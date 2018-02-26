'use strict';

var _constrainPositionToRegion = require('../constrainPositionToRegion');

var _constrainPositionToRegion2 = _interopRequireDefault(_constrainPositionToRegion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constrainPositionToRegion', function () {
  it('constrains position top and left when it overflows top/left', function () {
    var region = { width: 100, height: 100 };
    var constrain = { top: 10, left: 10, bottom: 300, right: 300 };
    var position = { top: 0, left: 0 };
    var expected = { top: 10, left: 10 };
    expect((0, _constrainPositionToRegion2.default)({ constrain: constrain, position: position, region: region })).to.deep.equal(expected);
  });
  it('constrains position top and left when it overflows bottom/right', function () {
    var constrain = { top: 10, left: 10, bottom: 300, right: 300 };
    var region = { width: 200, height: 200 };
    var position = { top: 200, left: 200 };
    var expected = { top: 100, left: 100 };
    expect((0, _constrainPositionToRegion2.default)({ constrain: constrain, position: position, region: region })).to.deep.equal(expected);
  });
  it('constrains position bottom and right when it overflows bottom/right', function () {
    var region = { width: 100, height: 100 };
    var constrain = { top: 0, left: 0, bottom: 300, right: 300 };
    var position = { bottom: -10, right: -10 };
    var expected = { bottom: 0, right: 0 };
    expect((0, _constrainPositionToRegion2.default)({ constrain: constrain, position: position, region: region })).to.deep.equal(expected);
  });
  it('constrains position bottom and right when it overflows top/left', function () {
    var constrain = { top: 0, left: 0, bottom: 300, right: 300 };
    var region = { width: 200, height: 200 };
    var position = { bottom: 200, right: 200 };
    var expected = { bottom: 100, right: 100 };
    expect((0, _constrainPositionToRegion2.default)({ constrain: constrain, position: position, region: region })).to.deep.equal(expected);
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