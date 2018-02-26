'use strict';

var _getNextNavigableItem = require('../getNextNavigableItem');

var _getNextNavigableItem2 = _interopRequireDefault(_getNextNavigableItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getNextNavigableItem', function () {
  it('should get first non disabled item in 1 direction, from top to bottom', function () {
    var items = [{ disabled: true }, { disabled: true }, { disabled: true }, { disabled: false }, // 3
    { disabled: true }, '-', { disabled: false }, // 6
    { disabled: false }, { disabled: true }];
    expect((0, _getNextNavigableItem2.default)(items, 3, 1)).equal(6);
  });
  it('should get first non disabled item in -1 direction, from bottom to top', function () {
    var items = [{ disabled: true }, { disabled: true }, { disabled: true }, { disabled: false }, // 3
    '-', { disabled: true }, { disabled: false }, // 6
    { disabled: false }, { disabled: true }];
    expect((0, _getNextNavigableItem2.default)(items, 6, -1)).equal(3);
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