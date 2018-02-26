'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('checkNode', function () {
  it('should return and have correct new collapsed state', function () {
    var dataSource = [{
      label: 'test 1'
    }, {
      label: 'test 2',
      nodes: [{
        label: 'test 3'
      }]
    }];

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { enableChecked: true, dataSource: dataSource }));
    var newCheckedState = wrapper.instance().checkNode('1');
    var expected = { '1': true, '1/0': true };

    expect(newCheckedState).to.deep.equal(expected);
    expect(wrapper.state().checked).to.deep.equal(expected);
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

describe('uncheckNode', function () {
  it('should return and have correct new collapsed state', function () {
    var dataSource = [{
      label: 'test 1'
    }, {
      label: 'test 2',
      nodes: [{
        label: 'test 3'
      }]
    }];

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
      enableChecked: true,
      dataSource: dataSource,
      defaultChecked: { '1': true, '0': true }
    }));
    var newCheckedState = wrapper.instance().uncheckNode('1');
    var expected = { '0': true };

    expect(newCheckedState).to.deep.equal(expected);
    expect(wrapper.state().checked).to.deep.equal(expected);
  });
});

describe('checkAll', function () {
  var dataSource = [{ label: 'test 1' }, {
    label: 'test 2',
    nodes: [{ label: 'test 3' }]
  }];
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { enableChecked: true, dataSource: dataSource }));
    var test = wrapper.instance().checkAll();
    var expected = {
      '0': true,
      '1': true,
      '1/0': true
    };
    expect(test).to.deep.equal(expected);
    expect(wrapper.state().checked).to.deep.equal(expected);
  });
});

describe('uncheckAll', function () {
  var dataSource = [{ label: 'test 1' }, {
    label: 'test 2',
    nodes: [{ label: 'test 3' }]
  }];
  it('should return and have correct new selected state', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { enableChecked: true, dataSource: dataSource }));
    var test = wrapper.instance().uncheckAll();
    var expected = {};
    expect(test).to.deep.equal(expected);
    expect(wrapper.state().checked).to.deep.equal(expected);
  });
});