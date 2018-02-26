'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

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

describe('className', function () {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, { className: 'testTree', dataSource: [] }));
  it('should have ' + CLASS_NAME + ' className', function () {
    expect(wrapper.find('.' + CLASS_NAME)).to.have.length(1);
  });
  it('className props is added', function () {
    expect(wrapper.find('.testTree')).to.have.length(1);
  });
  it('theme className is added by default', function () {
    expect(wrapper.find('.' + CLASS_NAME + '--theme-default')).to.have.length(1);
  });
  it('theme prop is added', function () {
    wrapper.setProps({ theme: 'test-theme' });
    expect(wrapper.find('.' + CLASS_NAME + '--theme-default')).to.have.length(0);
    expect(wrapper.find('.' + CLASS_NAME + '--theme-test-theme')).to.have.length(1);
  });
});