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

describe('expandOnDoubleClick', function () {
  describe('default =  false', function () {
    describe('click', function () {
      var wrapper = void 0;
      var onCollapsedChange = void 0;
      var label = void 0;
      var expandTool = void 0;

      beforeEach(function () {
        onCollapsedChange = sinon.spy();
        wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, { hasChildren: true, onCollapsedChange: onCollapsedChange }));
        label = wrapper.find('.' + CLASS_NAME + '__node__label');
        expandTool = wrapper.find(_ExpandTool2.default);
      });

      it('should call onCollapsedChange onClick on label', function () {
        label.simulate('click', { stopPropagation: function stopPropagation() {} });
        expect(onCollapsedChange.called).to.be.true;
      });

      it('should call onCollapsedChange onClick on expandTool', function () {
        expandTool.simulate('click', { stopPropagation: function stopPropagation() {} });
        expect(onCollapsedChange.called).to.be.true;
      });

      it('should not call onCollapsedChange on doubleClick on label', function () {
        expandTool.simulate('doubleClick', { stopPropagation: function stopPropagation() {} });
        expect(onCollapsedChange.called).to.be.false;
      });

      it('should not call onCollapsedChange on doubleClick on expandTool', function () {
        expandTool.simulate('doubleClick', { stopPropagation: function stopPropagation() {} });
        expect(onCollapsedChange.called).to.be.false;
      });
    });
  });
  describe('=true', function () {
    describe('click', function () {
      var wrapper = void 0;
      var onCollapsedChange = void 0;
      var label = void 0;
      var expandTool = void 0;

      beforeEach(function () {
        onCollapsedChange = sinon.spy();
        wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index2.default, {
          hasChildren: true,
          expandOnDoubleClick: true,
          onCollapsedChange: onCollapsedChange
        }));
        label = wrapper.find('.' + CLASS_NAME + '__node__label');
        expandTool = wrapper.find(_ExpandTool2.default);
      });

      it('should not call onCollapsedChange onClick on label', function () {
        label.simulate('click', { stopPropagation: function stopPropagation() {} });
        expect(onCollapsedChange.called).to.be.false;
      });

      it('should not call onCollapsedChange onClick on expandTool', function () {
        expandTool.simulate('click', { stopPropagation: function stopPropagation() {} });
        expect(onCollapsedChange.called).to.be.false;
      });

      it('should call onCollapsedChange on doubleClick on label', function () {
        expandTool.simulate('doubleClick', { stopPropagation: function stopPropagation() {} });
        expect(onCollapsedChange.called).to.be.true;
      });

      it('should call onCollapsedChange on doubleClick on expandTool', function () {
        expandTool.simulate('doubleClick', { stopPropagation: function stopPropagation() {} });
        expect(onCollapsedChange.called).to.be.true;
      });
    });
  });
});