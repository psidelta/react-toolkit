'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('visible', function () {
  it('renders correct className', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { visible: true }));
    expect(wrapper.find('.react-overlay--visible')).to.have.length(1);
    wrapper.setProps({ visible: false });
    expect(wrapper.find('.react-overlay--visible')).to.have.length(0);
  });
  it('controlled visible is not changed by setVisible', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { visible: true }));
    expect(wrapper.instance().getVisible()).to.be.true;
    wrapper.instance().setVisible(false);
    expect(wrapper.instance().getVisible()).to.be.true;
  });
  it('calls onVisibleChange', function () {
    var onVisibleChange = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { onVisibleChange: onVisibleChange }));
    wrapper.instance().setVisible(true);
    expect(onVisibleChange.called).to.be.true;
  });
  it('visible state changes when uncontrolled', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, null));
    wrapper.instance().setVisible(true);
    expect(wrapper.instance().getVisible()).to.be.true;
  });
  it('defaultVisible it is used as initial uncontrolled value', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { defaultVisible: true }));
    expect(wrapper.instance().getVisible()).to.be.true;
    wrapper.instance().setVisible(false);
    expect(wrapper.instance().getVisible()).to.be.false;
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