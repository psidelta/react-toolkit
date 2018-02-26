'use strict';

var _getOpositeIndex = require('../getOpositeIndex');

var _getOpositeIndex2 = _interopRequireDefault(_getOpositeIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getOpositeIndex', function () {
  it('returns correct oposite index', function () {
    expect((0, _getOpositeIndex2.default)(0, 20)).to.equal(19);
    expect((0, _getOpositeIndex2.default)(1, 20)).to.equal(18);
    expect((0, _getOpositeIndex2.default)(2, 20)).to.equal(17);
    expect((0, _getOpositeIndex2.default)(18, 20)).to.equal(1);
    expect((0, _getOpositeIndex2.default)(19, 20)).to.equal(0);
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