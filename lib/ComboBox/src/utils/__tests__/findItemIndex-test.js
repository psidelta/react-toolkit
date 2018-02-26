'use strict';

var _findItemIndex = require('../findItemIndex');

var _findItemIndex2 = _interopRequireDefault(_findItemIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('findItemIndex', function () {
  it('returns the correct index of the item', function () {
    var test = (0, _findItemIndex2.default)({
      data: [{ id: 1 }, { id: 2 }],
      id: 1,
      getIdProperty: function getIdProperty(item) {
        return item.id;
      }
    });

    expect(test).to.equal(0);
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