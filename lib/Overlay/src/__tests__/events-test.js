'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('events', function () {
  it('onShow called when visibile changes to true', function () {
    var onShow = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { onShow: onShow, defaultVisible: false }));
    wrapper.instance().setVisible(true);
    expect(onShow.called).to.be.true;
  });
  it('onHide called when visibile changes to false', function () {
    var onHide = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { onHide: onHide, defaultVisible: true }));
    wrapper.instance().setVisible(false);
    expect(onHide.called).to.be.true;
  });
  it('onVisibleChange is called whenever visibile changes, it is called with new state', function () {
    var onVisibleChange = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { onVisibleChange: onVisibleChange, defaultVisible: true }));
    wrapper.instance().setVisible(false);
    expect(onVisibleChange.called).to.be.true;
    expect(onVisibleChange.args[0][0]).to.be.false;
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