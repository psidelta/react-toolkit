'use strict';

var _filterByText = require('../filterByText');

var _filterByText2 = _interopRequireDefault(_filterByText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('filterByText', function () {
  it('returns a list that matches text', function () {
    var data = [{ label: 'test' }, { label: 'foo' }, { label: 'bar' }, { label: 'fooBar' }];
    var getFilterProperty = function getFilterProperty(item) {
      return item.label;
    };
    var test = (0, _filterByText2.default)({ data: data, getFilterProperty: getFilterProperty, text: 'foo' });

    expect(test).to.deep.equal([{ label: 'foo' }, { label: 'fooBar' }]);
  });
  it('returns a list that matches text', function () {
    var data = [{ label: 'test' }, { label: 'foo' }, { label: 'bar' }, { label: 'xfooBar' }];
    var getFilterProperty = function getFilterProperty(item) {
      return item.label;
    };
    var test = (0, _filterByText2.default)({ data: data, getFilterProperty: getFilterProperty, text: 'foo', mode: 'startsWidth' });

    expect(test).to.deep.equal([{ label: 'foo' }]);
  });
  it('returns a list with items for which filterFunction returned true', function () {
    var data = [{ label: 'test' }, { label: 'foo' }, { label: 'bar' }, { label: 'fooBar' }];
    var getFilterProperty = function getFilterProperty(item) {
      return item.label;
    };
    var filterFunction = function filterFunction(_ref) {
      var item = _ref.item;
      return item.label === 'foo';
    };
    var test = (0, _filterByText2.default)({ data: data, getFilterProperty: getFilterProperty, text: 'foo', filterFunction: filterFunction });

    expect(test).to.deep.equal([{ label: 'foo' }]);
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