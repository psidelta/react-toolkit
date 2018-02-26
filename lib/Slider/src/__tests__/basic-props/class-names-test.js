'use strict';

var _getClassNames = require('../../utils/get-class-names');

var _getClassNames2 = _interopRequireDefault(_getClassNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('components class names logic', function () {
  it('should pass down props className', function () {
    var classString = (0, _getClassNames2.default)({ className: 'test' }, {});
    expect(classString).to.contain('test');
  });

  it('should adds orientation modifier', function () {
    var props = void 0,
        classString = void 0,
        rangeClassString = void 0;

    props = {
      orientation: 'horizontal'
    };

    classString = (0, _getClassNames2.default)(props, {});
    expect(classString).to.contain('horizontal-orientation');

    props = {
      orientation: 'vertical'
    };

    classString = (0, _getClassNames2.default)(props, {});
    expect(classString).to.contain('vertical-orientation');
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