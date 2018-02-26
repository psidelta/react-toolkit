'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Overlay = require('../Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('methods', function () {
  it('show triggers visible change', function () {
    var onShow = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { onShow: onShow }));
    wrapper.instance().show();
    expect(onShow.called).to.be.true;
    expect(wrapper.instance().getVisible()).to.be.true;
  });
  it('hide triggers visible change', function () {
    var onHide = sinon.spy();
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Overlay2.default, { onHide: onHide }));
    wrapper.instance().hide();
    expect(onHide.called).to.be.true;
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