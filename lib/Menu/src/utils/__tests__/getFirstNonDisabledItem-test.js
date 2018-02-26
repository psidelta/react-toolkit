'use strict';

var _getFirstNonDisabledItem = require('../getFirstNonDisabledItem');

var _getFirstNonDisabledItem2 = _interopRequireDefault(_getFirstNonDisabledItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getFirstNonDisabledItem', function () {
  it('should return the first non disabled index', function () {
    var items = [{ disabled: true }, { disabled: true }, { disabled: true }, {}];

    expect((0, _getFirstNonDisabledItem2.default)(items)).to.equal(3);
  });
  it('should return null if all elements are disabled', function () {
    var items = [{ disabled: true }, { disabled: true }, { disabled: true }];
    expect((0, _getFirstNonDisabledItem2.default)(items)).to.be.null;
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