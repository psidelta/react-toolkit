'use strict';

var _changeChildrenProperty = require('../changeChildrenProperty');

var _changeChildrenProperty2 = _interopRequireDefault(_changeChildrenProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('changeChildrenProperty', function () {
  it('creates of all the children nodes, with true as value', function () {
    var node = {
      path: '0',
      children: [{
        props: { path: '0/0' }
      }, {
        props: {
          path: '0/1',
          children: [{
            props: {
              path: '0/1/0'
            }
          }]
        }
      }]
    };

    var expected = {
      '0': true,
      '0/0': true,
      '0/1': true,
      '0/1/0': true
    };

    expect((0, _changeChildrenProperty2.default)(node, true)).to.deep.equal(expected);
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