'use strict';

var _getNextItem = require('../getNextItem');

var _getNextItem2 = _interopRequireDefault(_getNextItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getNextItem', function () {
  it('returns next item when direction is 1', function () {
    var test = (0, _getNextItem2.default)({
      data: [{ id: 1 }, { id: 2 }],
      id: 1,
      getIdProperty: function getIdProperty(item) {
        return item.id;
      }
    });
    expect(test).to.equal(2);
  });
  it('if it has length 1 it returns the same id', function () {
    var test = (0, _getNextItem2.default)({
      data: [{ id: 1 }],
      id: 1,
      getIdProperty: function getIdProperty(item) {
        return item.id;
      }
    });
    expect(test).to.equal(1);
  });
  it('returns previous item whe direction is -1', function () {
    var test = (0, _getNextItem2.default)({
      data: [{ id: 1 }, { id: 2 }, { id: 3 }],
      id: 2,
      getIdProperty: function getIdProperty(item) {
        return item.id;
      },
      direction: -1
    });
    expect(test).to.equal(1);
  });
  it('navigates to next item if the curret item is disabled', function () {
    var test = (0, _getNextItem2.default)({
      data: [{ id: 1 }, { id: 2, disabled: true }, { id: 3 }],
      id: 1,
      getIdProperty: function getIdProperty(item) {
        return item.id;
      },
      direction: 1
    });
    expect(test).to.equal(3);
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