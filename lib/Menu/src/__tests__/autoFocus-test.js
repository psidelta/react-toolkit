'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _renderIntoDOM2 = require('./renderIntoDOM');

var _renderIntoDOM3 = _interopRequireDefault(_renderIntoDOM2);

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

describe('autoFocus', function () {
  it('it should have focus after it was rendered', function (done) {
    var _renderIntoDOM = (0, _renderIntoDOM3.default)(_react2.default.createElement(_Menu2.default, { autoFocus: true, items: [{ label: 'test' }] })),
        wrapper = _renderIntoDOM.wrapper,
        wrapperNode = _renderIntoDOM.wrapperNode,
        unmount = _renderIntoDOM.unmount;

    setTimeout(function () {
      expect(wrapperNode).to.be.equal(document.activeElement);
      done();
    }, 300);
  });
});