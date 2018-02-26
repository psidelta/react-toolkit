'use strict';

var _getMinMaxSize = require('../getMinMaxSize');

var _getMinMaxSize2 = _interopRequireDefault(_getMinMaxSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getMinMaxSize', function () {
  it('constructs correct config object with single value', function () {
    expect((0, _getMinMaxSize2.default)({
      minSize: 20
    })).to.deep.equal({
      minWidth: 20,
      minHeight: 20
    });

    expect((0, _getMinMaxSize2.default)({
      maxSize: 20
    })).to.deep.equal({
      maxWidth: 20,
      maxHeight: 20
    });

    expect((0, _getMinMaxSize2.default)({
      maxSize: 20,
      minSize: 22
    })).to.deep.equal({
      maxWidth: 20,
      maxHeight: 20,
      minWidth: 22,
      minHeight: 22
    });
  });

  it('constructs correct config object with one key set', function () {
    expect((0, _getMinMaxSize2.default)({
      minSize: { width: 20, height: 22 }
    })).to.deep.equal({
      minWidth: 20,
      minHeight: 22
    });

    expect((0, _getMinMaxSize2.default)({
      minSize: { width: 20 }
    })).to.deep.equal({
      minWidth: 20
    });

    expect((0, _getMinMaxSize2.default)({
      maxSize: { width: 20, height: 22 }
    })).to.deep.equal({
      maxWidth: 20,
      maxHeight: 22
    });

    expect((0, _getMinMaxSize2.default)({
      maxSize: { width: 20, height: 22 },
      minSize: { width: 21, height: 24 }
    })).to.deep.equal({
      maxWidth: 20,
      maxHeight: 22,
      minWidth: 21,
      minHeight: 24
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