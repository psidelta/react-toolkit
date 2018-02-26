'use strict';

var _adjustPositionWithOffset = require('../adjustPositionWithOffset');

var _adjustPositionWithOffset2 = _interopRequireDefault(_adjustPositionWithOffset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractPosition = function extractPosition(_ref) {
  var top = _ref.top,
      right = _ref.right;
  return { top: top, right: right };
}; /**
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

describe('adjustPositionWithOffset', function () {
  it('adds offset to correct positions', function () {
    var input = [{ top: 10, right: 10, offset: { top: 10, right: 20 } }, { top: 80, right: 20, offset: { top: 5, right: 2 } }];

    var expected = [{ top: 20, right: 30 }, { top: 85, right: 22 }];

    var test = (0, _adjustPositionWithOffset2.default)(input).map(extractPosition);

    expect(test).to.deep.equal(expected);
  });
});