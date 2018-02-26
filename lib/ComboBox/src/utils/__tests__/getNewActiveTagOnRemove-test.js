'use strict';

var _getNewActiveTagOnRemove = require('../getNewActiveTagOnRemove');

var _getNewActiveTagOnRemove2 = _interopRequireDefault(_getNewActiveTagOnRemove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getNewActiveTagOnRemove', function () {
  it('returns the correct activeTag after activeTag was removed', function () {
    expect((0, _getNewActiveTagOnRemove2.default)({ id: 2, value: [1, 2, 3] })).to.equal(1);
    expect((0, _getNewActiveTagOnRemove2.default)({ id: 3, value: [1, 2, 3] })).to.equal(2);
    expect((0, _getNewActiveTagOnRemove2.default)({ id: 3, value: [3] })).to.be.null;
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