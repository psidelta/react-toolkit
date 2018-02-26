'use strict';

var _getLastRootNode = require('../getLastRootNode');

var _getLastRootNode2 = _interopRequireDefault(_getLastRootNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getLastRootNode', function () {
  it('should return the correct node', function () {
    var visibleNodes = [{ id: 1, parent: null }, { id: 2, parent: null }, { id: 3, parent: {} }, { id: 4, parent: null }, { id: 5, parent: null }];

    expect((0, _getLastRootNode2.default)(1, visibleNodes).id).to.equal(5);
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