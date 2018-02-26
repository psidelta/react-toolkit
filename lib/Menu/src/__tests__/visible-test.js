'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _renderIntoDOM4 = require('./renderIntoDOM');

var _renderIntoDOM5 = _interopRequireDefault(_renderIntoDOM4);

require('../../style/index.scss');

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

var ROOT_CLASS = _Menu2.default.defaultProps.rootClassName;

describe('visible', function () {
  it('should have ' + ROOT_CLASS + '--hidden className', function () {
    var _renderIntoDOM = (0, _renderIntoDOM5.default)(_react2.default.createElement(_Menu2.default, { visible: false, items: [{ label: 'test' }] })),
        wrapper = _renderIntoDOM.wrapper,
        wrapperNode = _renderIntoDOM.wrapperNode,
        unmount = _renderIntoDOM.unmount;

    expect(wrapperNode.classList.contains(ROOT_CLASS + '--hidden')).to.be.true;
    unmount();
  });

  it('visible=false should have computed style of visibility = hidden', function () {
    var _renderIntoDOM2 = (0, _renderIntoDOM5.default)(_react2.default.createElement(_Menu2.default, { visible: false, items: [{ label: 'test' }] })),
        wrapper = _renderIntoDOM2.wrapper,
        wrapperNode = _renderIntoDOM2.wrapperNode,
        unmount = _renderIntoDOM2.unmount;

    expect(getComputedStyle(wrapperNode).visibility).to.be.equal('hidden');
    unmount();
  });

  it('visible=false should have computed style of visibility = true', function () {
    var _renderIntoDOM3 = (0, _renderIntoDOM5.default)(_react2.default.createElement(_Menu2.default, { visible: true, items: [{ label: 'test' }] })),
        wrapper = _renderIntoDOM3.wrapper,
        wrapperNode = _renderIntoDOM3.wrapperNode,
        unmount = _renderIntoDOM3.unmount;

    expect(getComputedStyle(wrapperNode).visibility).to.be.equal('visible');
    unmount();
  });
});