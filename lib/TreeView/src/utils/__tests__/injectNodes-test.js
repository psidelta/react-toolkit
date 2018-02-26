'use strict';

var _injectNodes = require('../injectNodes');

var _injectNodes2 = _interopRequireDefault(_injectNodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('injectNodes', function () {
  it('should inject nodes at the correct place', function () {
    var nodesToInject = [{ label: 'injectedNode' }];
    var data = [{
      label: 'test',
      nodes: [{
        label: 'test 1'
      }]
    }];

    var expected = [{
      label: 'test',
      nodes: [{
        label: 'test 1',
        nodes: nodesToInject
      }]
    }];

    var test = (0, _injectNodes2.default)(nodesToInject, [0, 0], data);

    expect(test).to.deep.equal(expected);
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