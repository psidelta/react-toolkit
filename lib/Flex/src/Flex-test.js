'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _testUtils = require('../../common/testUtils');

var _testUtils2 = _interopRequireDefault(_testUtils);

var _index = require('./index');

require('../style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStyle = function getStyle(instance) {
  return getComputedStyle((0, _reactDom.findDOMNode)((0, _testUtils2.default)(instance)));
}; /**
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

describe('Flex', function () {
  it('props.row should apply flex-flow: row', function () {
    var style = getStyle(_react2.default.createElement(_index.Flex, { row: true, flex: 2 }));

    expect(style.flexGrow).to.equal('2');
    expect(style.flexFlow).to.equal('row wrap');
  });
  it('props.column should apply flex-flow: column', function () {
    var style = getStyle(_react2.default.createElement(_index.Flex, { wrap: false, column: true }));

    expect(style.flexGrow).to.equal('0');
    expect(style.flexFlow).to.equal('column nowrap');
  });

  it('props.alignItems should be applied correctly', function () {
    var style = getStyle(_react2.default.createElement(_index.Flex, { alignItems: 'end' }));

    expect(style.alignItems).to.equal('flex-end');
  });

  it('should accept className', function () {
    var instance = (0, _reactDom.findDOMNode)((0, _testUtils2.default)(_react2.default.createElement(_index.Flex, { className: 'xxx' })));

    expect(instance.className).to.contain('xxx');
  });

  it('should accept style', function () {
    var style = getStyle(_react2.default.createElement(_index.Flex, { style: { marginLeft: 1 } }));

    expect(style.marginLeft).to.equal('1px');
  });
});

describe('Item', function () {
  it('should default to flex 1', function () {
    var style = getStyle(_react2.default.createElement(_index.Item, null));

    expect(style.flexGrow).to.equal('1');
  });

  it('should accept className', function () {
    var instance = (0, _reactDom.findDOMNode)((0, _testUtils2.default)(_react2.default.createElement(_index.Item, { className: 'xxx' })));

    expect(instance.className).to.contain('xxx');
  });

  it('should accept style', function () {
    var style = getStyle(_react2.default.createElement(_index.Item, { style: { marginLeft: 1 } }));

    expect(style.marginLeft).to.equal('1px');
  });
});