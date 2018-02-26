'use strict';

var _matchesSelector = require('../matchesSelector');

var _matchesSelector2 = _interopRequireDefault(_matchesSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('matchesSelector', function () {
  it('returns true when it node matches a selector', function () {
    var fixture = '<div id="fixture1">\n        <div id="target1" class="tooltip">\n          target 1\n        </div>\n        <div id="target2" class="tooltip"> target 2 </div>\n        <div id="target3"> target 3 </div>\n        <div id="tooltip">\n          Hello world from tooltip\n        </div>\n      </div>\n    ';
    document.body.insertAdjacentHTML('afterbegin', fixture);

    var target = document.getElementById('target2');
    expect((0, _matchesSelector2.default)(target, '.tooltip')).to.be.true;
    expect((0, _matchesSelector2.default)(target, '.tooltip2')).to.be.false;

    document.body.removeChild(document.getElementById('fixture1'));
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