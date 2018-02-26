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

describe('node.label', function () {
  it('should render as a string', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { node: { label: 'hello world' } }));
    window.wrapper = wrapper;
    expect(wrapper.find('.zippy-react-toolkit-tree-view__node__label__text').text()).to.be.equal('hello world');
  });

  it('should render as jsx', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { node: { label: _react2.default.createElement(
          'div',
          { id: 'labelJSX' },
          'hello world'
        ) } }));
    expect(wrapper.find('#labelJSX')).to.have.length(1);
  });

  it('should render as a function', function () {
    var label = sinon.stub();
    label.returns(_react2.default.createElement(
      'div',
      { id: 'functionLabel' },
      'hello world'
    ));
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Node2.default, { id: 'customId', node: { label: label } }));

    expect(label.called).to.be.true;
    expect(wrapper.find('#functionLabel')).to.have.length(1);
    expect(label.args[0][0].id).to.be.equal('customId');
  });
});