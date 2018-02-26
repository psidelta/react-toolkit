'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Overlay', function () {
  it('should create instance of Overlay', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { target: '.tooltip' }));
    expect(wrapper.instance()).to.be.instanceOf(_Overlay2.default);
  });
  it('should add className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { target: '.tooltip', className: 'custom-class-name' }));
    expect(wrapper.find('.custom-class-name')).to.have.length(1);
  });
  it('should add style', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Overlay2.default, { target: '.tooltip', style: { color: 'red' } }));
    expect(wrapper.props().style.color).to.equal('red');
  });
}); /**
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