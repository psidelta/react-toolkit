'use strict';

var _filterByValue = require('../filterByValue');

var _filterByValue2 = _interopRequireDefault(_filterByValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('filterByValue', function () {
  it('filters out selected items', function () {
    var data = [{ id: 1, label: 'test1' }, { id: 2, label: 'test2' }, { id: 3, label: 'test3' }];
    var expected = [{ id: 2, label: 'test2' }];
    var value = [1, 3];
    var getIdProperty = function getIdProperty(item) {
      return item.id;
    };

    expect((0, _filterByValue2.default)({ data: data, getIdProperty: getIdProperty, value: value })).to.deep.equal(expected);
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