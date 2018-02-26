'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataSource = [{ label: 'test 1' }, {
  label: 'test 2',
  nodes: [{ label: 'test 3' }]
}]; /**
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

describe('setSelected', function () {
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      enableSelection: true,
      defaultSelected: { '0': true },
      dataSource: dataSource
    }));

    var newSelectedState = wrapper.instance().setSelected({ '1': true, '1/0': true });
    var expected = { '1': true, '1/0': true };

    expect(newSelectedState).to.deep.equal(expected);
    expect(wrapper.state().selected).to.deep.equal(expected);
  });
});

describe('selectNode', function () {
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { enableSelection: true, dataSource: dataSource }));
    var newCheckedState = wrapper.instance().selectNode('1');
    var expected = { '1': true };

    expect(newCheckedState).to.deep.equal(expected);
    expect(wrapper.state().selected).to.deep.equal(expected);
  });
});

describe('deselectNode', function () {
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      defaultSelected: { '1': 'true' },
      enableSelection: true,
      dataSource: dataSource
    }));
    var newCheckedState = wrapper.instance().deselectNode('1');
    var expected = {};

    expect(newCheckedState).to.deep.equal(expected);
    expect(wrapper.state().selected).to.deep.equal(expected);
  });
});

describe('selectAll', function () {
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { enableSelection: true, dataSource: dataSource }));
    var test = wrapper.instance().selectAll();
    var expected = {
      '0': true,
      '1': true,
      '1/0': true
    };
    expect(test).to.deep.equal(expected);
    expect(wrapper.state().selected).to.deep.equal(expected);
  });
});

describe('deselectAll', function () {
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      defaultSelected: { '1': true },
      enableSelection: true,
      dataSource: dataSource
    }));
    var test = wrapper.instance().deselectAll();
    var expected = {};
    expect(test).to.deep.equal(expected);
    expect(wrapper.state().selected).to.deep.equal(expected);
  });
});