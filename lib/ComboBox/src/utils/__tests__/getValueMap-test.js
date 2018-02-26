'use strict';

var _getValueMap = require('../getValueMap');

var _getValueMap2 = _interopRequireDefault(_getValueMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getValueMap', function () {
  it('adds new values and removes ones that are no longer present, and keeps the ones already in', function () {
    var dataMap = {
      1: { id: 1 },
      2: { id: 2 },
      3: { id: 3 },
      4: { id: 4 }
    };
    var value = [1, 2, 3];
    var test = (0, _getValueMap2.default)({
      value: value, dataMap: dataMap,
      oldvalueMap: {
        4: { id: 4 },
        2: { id: 2 }
      }
    });

    expect(test).to.deep.equal({
      1: { id: 1 },
      3: { id: 3 },
      2: { id: 2 }
    });
  });
  it('works width single select', function () {
    var dataMap = {
      1: { id: 1 },
      2: { id: 2 },
      3: { id: 3 },
      4: { id: 4 }
    };
    var value = 2;
    var test = (0, _getValueMap2.default)({
      value: value, dataMap: dataMap,
      oldvalueMap: {
        4: { id: 4 }
      }
    });

    expect(test).to.deep.equal({
      2: { id: 2 }
    });
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