'use strict';

var _getClassName = require('../getClassName');

var _getClassName2 = _interopRequireDefault(_getClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('list getClassName', function () {
  it('adds rootClassName', function () {
    var props = { rootClassName: 'root' };
    var test = (0, _getClassName2.default)({ props: props });
    expect(test).to.equal('root root--empty');
  });
  it('adds className', function () {
    var props = { className: 'list', rootClassName: 'root' };
    var test = (0, _getClassName2.default)({ props: props });
    expect(test).to.equal('root list root--empty');
  });
  it('adds list position', function () {
    var props = { listPosition: 'top', rootClassName: 'root' };
    var test = (0, _getClassName2.default)({ props: props });
    expect(test).to.equal('root root--top root--empty');
  });
  it('adds loading', function () {
    var props = { loading: true, rootClassName: 'root' };
    var test = (0, _getClassName2.default)({ props: props });
    expect(test).to.equal('root root--loading root--empty');
  });
  it('empty', function () {
    var props = { rootClassName: 'root' };
    var test = (0, _getClassName2.default)({ props: props });
    expect(test).to.equal('root root--empty');
    var props2 = { rootClassName: 'root', data: { length: 30 } };
    var test2 = (0, _getClassName2.default)({ props: props2 });
    expect(test2).to.equal('root');
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