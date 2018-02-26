'use strict';

var _hightlightText = require('../hightlightText');

var _hightlightText2 = _interopRequireDefault(_hightlightText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('hightlightText', function () {
  it('contains - returns a structure marking the matched text', function () {
    var test = 'hello world';
    var expected = ['hel', { match: 'lo w' }, 'orld'];
    expect((0, _hightlightText2.default)({
      queryText: 'lo w',
      text: test,
      mode: 'contains'
    })).to.deep.equal(expected);
  });
  it('starts width - returns a structure marking the matched text', function () {
    var text = 'hello world';
    var expected = [{ match: 'hell' }, 'o world'];

    var test = (0, _hightlightText2.default)({
      text: text,
      queryText: 'hell',
      mode: 'startsWidth'
    });
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