'use strict';

var _getGroupedItems = require('../getGroupedItems');

var _getGroupedItems2 = _interopRequireDefault(_getGroupedItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getGroupedItems', function () {
  it('returns the full list when all items fit', function () {
    var boxes = [30, 20, 20, 30];
    var maxSize = 100;
    var test = (0, _getGroupedItems2.default)({ boxes: boxes, maxSize: maxSize });
    expect(test).to.be.false;
  });
  it('separates corecty the indexes in visible and overflowItems', function () {
    var boxes = [20, 30, 30, 30];
    var maxSize = 100;
    var test = (0, _getGroupedItems2.default)({ boxes: boxes, maxSize: maxSize });

    expect(test.visibleIndexes).to.deep.equal([0, 1, 2]);
    expect(test.overflowIndexes).to.deep.equal([3]);
  });
  it('overflow control can make one item more to overflow', function () {
    var boxes = [30, 30, 30, 30];
    var maxSize = 100;
    var overflowControlSize = 20;
    var test = (0, _getGroupedItems2.default)({ boxes: boxes, maxSize: maxSize, overflowControlSize: overflowControlSize });

    expect(test.visibleIndexes).to.deep.equal([0, 1]);
    expect(test.overflowIndexes).to.deep.equal([2, 3]);
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