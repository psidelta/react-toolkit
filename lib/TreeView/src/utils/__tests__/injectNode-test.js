'use strict';

var _injectNode = require('../injectNode');

var _injectNode2 = _interopRequireDefault(_injectNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('injectNode', function () {
  it('should inject node at the correct place', function () {
    var nodeToInject = { label: 'injectedNode' };
    var data = [{
      label: 'test',
      nodes: [{
        label: 'test 1'
      }]
    }];

    var expected = [{
      label: 'test',
      nodes: [nodeToInject]
    }];

    var test = (0, _injectNode2.default)(nodeToInject, [0, 0], data);

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