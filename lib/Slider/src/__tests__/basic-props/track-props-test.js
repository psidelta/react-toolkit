'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Slider = require('../../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('trackFillPosition prop (Slider only)', function () {
  it('should propagate trackFillPosition to renderTrack function', function () {
    var renderTrackSpy = sinon.spy(function () {
      return _react2.default.createElement('div', { key: 'spy' });
    });
    var sliderComponent = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { renderTrack: renderTrackSpy, trackFillPosition: 'start' }));

    expect(renderTrackSpy.getCall(0).args[0]).to.have.property('trackFillPosition', 'start');

    sliderComponent.setProps({
      trackFillPosition: 'end'
    });

    expect(renderTrackSpy.getCall(1).args[0]).to.have.property('trackFillPosition', 'end');
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