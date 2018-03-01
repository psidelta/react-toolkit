'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Slider = require('../../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _RangeSlider = require('../../RangeSlider');

var _RangeSlider2 = _interopRequireDefault(_RangeSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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