'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('setActiveNode', function () {
  it('should update the active noode', function () {
    var dataSource = [{
      label: 'test 1'
    }, {
      label: 'test 2',
      nodes: [{
        label: 'test 3'
      }]
    }];

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { enableChecked: true, dataSource: dataSource, defaultActiveNode: '1' }));

    var newCollapsedState = wrapper.instance().setActiveNode('1/0');
    var expected = '1/0';

    expect(newCollapsedState).to.be.equal(expected);
    expect(wrapper.state().activeNode).to.be.equal(expected);
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