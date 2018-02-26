'use strict';

var _deselectValue = require('../deselectValue');

var _deselectValue2 = _interopRequireDefault(_deselectValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('deselectValue', function () {
  it('deselects single value', function () {
    expect((0, _deselectValue2.default)({ id: 20, value: 20 })).to.be.null;
  });
  it('nows how to handle null value', function () {
    expect((0, _deselectValue2.default)({ id: 20, value: null })).to.be.null;
  });
  it('removes id from multiple value', function () {
    expect((0, _deselectValue2.default)({ id: 20, value: [20, 30] })).to.deep.equal([30]);
  });
  it('returns null when multiple results to an empty array', function () {
    expect((0, _deselectValue2.default)({ id: 20, value: [20] })).to.be.null;
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