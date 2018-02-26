'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Node = require('../../Node');

var _Node2 = _interopRequireDefault(_Node);

var _enzyme = require('enzyme');

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

describe('icons', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, null));
  });

  describe('nodeIcon', function () {
    it('should render img if a string', function () {
      wrapper.setProps({
        nodeIcon: 'test'
      });
      expect(wrapper.find('.' + CLASS_NAME + '__node__icon-img')).to.have.length(1);
    });

    it('it should render jsx', function () {
      wrapper.setProps({
        nodeIcon: _react2.default.createElement('div', { id: 'customIcon' })
      });
      expect(wrapper.find('#customIcon')).to.have.length(1);
    });
  });

  describe('leafNodeIcon', function () {
    it('should render if it is collapsed jsx and overwrite nodeIcon', function () {
      wrapper.setProps({
        collapsed: true,
        nodeIcon: _react2.default.createElement('div', { id: 'customIcon' }),
        leafNodeIcon: _react2.default.createElement('div', { id: 'customIcon2' })
      });
      expect(wrapper.find('#customIcon2')).to.have.length(1);
      expect(wrapper.find('#customIcon')).to.have.length(0);
    });
    it('should render img if a string', function () {
      wrapper.setProps({
        leafNodeIcon: 'test'
      });
      expect(wrapper.find('.' + CLASS_NAME + '__node__icon-img')).to.have.length(1);
    });
  });

  describe('nodeCollapsedIcon', function () {
    it('should render if it is collapsed jsx and overwrite nodeIcon', function () {
      wrapper.setProps({
        hasChildren: true,
        collapsed: true,
        nodeIcon: _react2.default.createElement('div', { id: 'customIcon' }),
        nodeCollapsedIcon: _react2.default.createElement('div', { id: 'customIcon2' })
      });
      expect(wrapper.find('#customIcon2')).to.have.length(1);
      expect(wrapper.find('#customIcon')).to.have.length(0);
    });
    it('should render img if a string', function () {
      wrapper.setProps({
        collapsed: true,
        hasChildren: true,
        nodeCollapsedIcon: 'test'
      });
      expect(wrapper.find('.' + CLASS_NAME + '__node__icon-img')).to.have.length(1);
    });
  });
});