'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Node = require('../../Node');

var _Node2 = _interopRequireDefault(_Node);

var _TreeView = require('../../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
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

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('loading', function () {
  it('should add loading className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Node2.default, { loading: true }));
    expect(wrapper.find('.' + CLASS_NAME + '__node--loading')).to.have.length(1);
  });

  describe('loadTool', function () {
    it('should render a loader', function () {
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Node2.default, { loading: true }));
      expect(wrapper.find('.' + CLASS_NAME + '__node__loader')).to.have.length(1);
    });

    it('should render as jsx', function () {
      var loadTool = _react2.default.createElement('div', { id: 'customLoadTool' });
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Node2.default, { loading: true, loadTool: loadTool }));

      expect(wrapper.find('#customLoadTool')).to.have.length(1);
    });

    it('should render what it returns if it is a function', function () {
      var loadTool = function loadTool() {
        return _react2.default.createElement('div', { id: 'customLoadTool' });
      };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Node2.default, { loading: true, loadTool: loadTool }));

      expect(wrapper.find('#customLoadTool')).to.have.length(1);
    });
  });
});