'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName; /**
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

var NESTED_DATA_STRUCTURE = [{
  label: 'test 1'
}, {
  label: 'test 2',
  nodes: [{
    label: 'test 3'
  }, {
    label: 'test 4'
  }, {
    label: 'test 5'
  }]
}];

describe('enableHoverStyle', function () {
  it('defaults to true', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE }));
    expect(wrapper.props().enableHoverStyle).to.be.true;
  });
  it('should add ' + CLASS_NAME + '--enable-hover-style className', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE }));
    expect(wrapper.find('.' + CLASS_NAME + '--enable-hover-style')).to.have.length(1);
  });
});