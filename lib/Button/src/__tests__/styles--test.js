'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('style', function () {
  it('adds pressedStyle when button is pressed', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Button2.default, { id: 'button', pressed: true, pressedStyle: { color: 'red' } }));
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
  it('adds focusedStyle when button is focused', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Button2.default, { id: 'button', pressed: true, focusedStyle: { color: 'red' } }));
    wrapper.setState({ focused: true });
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
  it('adds overStyle when button is over', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Button2.default, { id: 'button', pressed: true, overStyle: { color: 'red' } }));
    wrapper.setState({ mouseOver: true });
    expect(wrapper.find('#button').props().style.color).to.equal('red');
  });
  it('adds activeStyle when button is active', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Button2.default, { id: 'button', pressed: true, activeStyle: { color: 'red' } }));
    wrapper.setState({ active: true });
    expect(wrapper.find('#button').props().style.color).to.equal('red');
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