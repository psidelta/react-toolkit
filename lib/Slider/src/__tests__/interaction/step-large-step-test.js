'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Slider = require('../../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _RangeSlider = require('../../RangeSlider');

var _RangeSlider2 = _interopRequireDefault(_RangeSlider);

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

describe('step prop', function () {
  it('defaults to 1 and gets propagated to toValue method', function () {
    var toStepSpy = sinon.spy(function (value) {
      return value;
    });
    var slider = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { toStep: toStepSpy }));
    var rangeSlider = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { toStep: toStepSpy }));

    expect(toStepSpy.getCall(0).args[1]).to.equal(1);
    expect(toStepSpy.getCall(1).args[1]).to.equal(1);
    expect(toStepSpy.getCall(2).args[1]).to.equal(1);
  });

  it('should propagate custom step to toStep function', function () {
    var STEP_1 = 10;
    var STEP_2 = 20;

    var toStepSpy = sinon.spy(function (value) {
      return value;
    });
    var slider = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { step: STEP_1, toStep: toStepSpy }));
    var rangeSlider = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { step: STEP_2, toStep: toStepSpy }));

    expect(toStepSpy.getCall(0).args[1]).to.equal(STEP_1);
    expect(toStepSpy.getCall(1).args[1]).to.equal(STEP_2);
    expect(toStepSpy.getCall(2).args[1]).to.equal(STEP_2);
  });

  it('should propagate step when keyboard even happens', function () {
    var getValueModifierSpy = sinon.spy(function (value) {
      return value;
    });
    var slider = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { step: 5, getValueModifier: getValueModifierSpy }));

    getValueModifierSpy.reset();
    slider.instance().handleKeyDown({ deltaY: 1 });

    expect(getValueModifierSpy.getCall(0).args[1]).to.have.property('step', 5);
  });
});

describe('largeStep prop', function () {
  it('should propagate largeStep when keyboard even happens', function () {
    var getValueModifierSpy = sinon.spy(function (value) {
      return value;
    });
    var slider = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { largeStep: 5, getValueModifier: getValueModifierSpy }));

    getValueModifierSpy.reset();
    slider.instance().handleKeyDown({ deltaY: 1 });

    expect(getValueModifierSpy.getCall(0).args[1]).to.have.property('largeStep', 5);
  });
});