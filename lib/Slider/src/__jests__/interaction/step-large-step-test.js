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
    var toStepSpy = jest.fn(function (value) {
      return value;
    });
    var slider = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { toStep: toStepSpy }));
    var rangeSlider = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { toStep: toStepSpy }));

    expect(toStepSpy.mock.calls[0][1]).toEqual(1);
    expect(toStepSpy.mock.calls[1][1]).toEqual(1);
    expect(toStepSpy.mock.calls[2][1]).toEqual(1);
  });

  it('should propagate custom step to toStep function', function () {
    var STEP_1 = 10;
    var STEP_2 = 20;

    var toStepSpy = jest.fn(function (value) {
      return value;
    });
    var slider = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { step: STEP_1, toStep: toStepSpy }));
    var rangeSlider = (0, _enzyme.shallow)(_react2.default.createElement(_RangeSlider2.default, { step: STEP_2, toStep: toStepSpy }));

    expect(toStepSpy.mock.calls[0][1]).toEqual(STEP_1);
    expect(toStepSpy.mock.calls[1][1]).toEqual(STEP_2);
    expect(toStepSpy.mock.calls[2][1]).toEqual(STEP_2);
  });

  it('should propagate step when keyboard even happens', function () {
    var getValueModifierSpy = jest.fn(function (value) {
      return value;
    });
    var slider = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { step: 5, getValueModifier: getValueModifierSpy }));

    slider.instance().handleKeyDown({ deltaY: 1 });

    expect(getValueModifierSpy.mock.calls[0][1]).toHaveProperty('step', 5);
  });
});

describe('largeStep prop', function () {
  it('should propagate largeStep when keyboard even happens', function () {
    var getValueModifierSpy = jest.fn(function (value) {
      return value;
    });
    var slider = (0, _enzyme.shallow)(_react2.default.createElement(_Slider2.default, { largeStep: 5, getValueModifier: getValueModifierSpy }));

    slider.instance().handleKeyDown({ deltaY: 1 });

    expect(getValueModifierSpy.mock.calls[0][1]).toHaveProperty('largeStep', 5);
  });
});