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

describe('checkOnClick', function () {
  it('should default to false', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, null));
    expect(wrapper.props().checkOnClick).to.be.true;
  });
  it('should not trigger onCheckedChange if false', function () {
    var onCheckedChange = sinon.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { checkOnClick: false, onCheckedChange: onCheckedChange }));
    wrapper.instance().onLabelClick({ stopPropagation: function stopPropagation() {} });
    expect(onCheckedChange.called).to.be.false;
  });

  it('should trigger onCheckedChange if true', function () {
    var onCheckedChange = sinon.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { checkOnClick: true, onCheckedChange: onCheckedChange }));
    wrapper.instance().onLabelClick({ stopPropagation: function stopPropagation() {} });
    expect(onCheckedChange.called).to.be.true;
  });
});