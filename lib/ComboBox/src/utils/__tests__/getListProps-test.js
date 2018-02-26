'use strict';

var _getListProps = require('../getListProps');

var _getListProps2 = _interopRequireDefault(_getListProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('listProps', function () {
  it('select correct props for lsit', function () {
    var props = {
      listClassName: 'listClassName',
      listEmptyText: 'emptyText',
      listLoadingText: 'loading',
      selectedStyle: 'selectedStyle',
      selectedClassName: 'selectedClassName'
    };

    var computed = {
      data: [],
      idProperty: 'idProperty',
      displayProperty: 'displayProperty'
    };

    var test = (0, _getListProps2.default)({ props: props, computed: computed });

    expect(test.className).to.equal(props.listClassName);

    expect(test.emptyText).to.equal(props.listEmptyText);
    expect(test.loadingText).to.equal(props.listLoadingText);

    expect(test.emptyText).to.equal(props.listEmptyText);
    expect(test.loadingText).to.equal(props.listLoadingText);

    expect(test.data).to.equal(computed.data);
    expect(test.getIdProperty).to.equal(computed.getIdProperty);
    expect(test.getDisplayProperty).to.equal(computed.getDisplayProperty);
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