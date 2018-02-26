'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _ExpandTool = require('../ExpandTool');

var _ExpandTool2 = _interopRequireDefault(_ExpandTool);

var _TreeView = require('../../TreeView');

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

describe('expandOnToolOnly', function () {
  describe('false', function () {
    it('should call this.props.onCollapsedChange on click on label', function () {
      var onCollapsedChange = sinon.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { hasChildren: true, onCollapsedChange: onCollapsedChange }));
      wrapper.find('.' + CLASS_NAME + '__node__label').simulate('click', {
        stopPropagation: function stopPropagation() {}
      });
      expect(onCollapsedChange.called).to.be.true;
    });
  });

  describe('true', function () {
    it('should call this.props.onCollapsedChange only on ExpandTool', function () {
      var onCollapsedChange = sinon.spy();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, {
        hasChildren: true,
        expandOnToolOnly: true,
        onCollapsedChange: onCollapsedChange
      }));

      wrapper.find('.' + CLASS_NAME + '__node__label').simulate('click', {
        stopPropagation: function stopPropagation() {}
      });
      expect(onCollapsedChange.called).to.be.false;

      wrapper.find(_ExpandTool2.default).simulate('click', {
        stopPropagation: function stopPropagation() {}
      });
      expect(onCollapsedChange.called).to.be.true;
    });
  });
});